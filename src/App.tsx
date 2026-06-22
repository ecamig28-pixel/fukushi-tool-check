import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { categoryDescriptions, categoryOrder, toolById, tools } from './data/tools'
import { checkItems } from './data/checkItems'
import type { CheckItem, Risk, ToolCategory } from './types'

type Screen = 'home' | 'checklist'

const STORAGE_KEY = 'fukushi-tool-check:checked:v1'

const riskClass: Record<Risk, string> = {
  転倒: 'danger',
  転落: 'danger',
  褥瘡: 'purple',
  誤使用: 'amber',
  身体機能低下: 'blue',
  介助負担増加: 'amber',
  痛み: 'purple',
  挟み込み: 'danger',
  衛生面: 'green',
  外出機会低下: 'blue',
}

const searchableText = (item: CheckItem) =>
  [item.toolName, item.title, item.shortCheck, ...item.checkPoints, ...item.commonCauses, ...item.risks]
    .join(' ')
    .toLocaleLowerCase('ja')

const readChecked = (): Set<string> => {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return new Set(Array.isArray(value) ? value.filter((item) => typeof item === 'string') : [])
  } catch {
    return new Set()
  }
}

function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [selectedToolIds, setSelectedToolIds] = useState<string[]>([])
  const [query, setQuery] = useState('')
  const [checkedIds, setCheckedIds] = useState<Set<string>>(readChecked)
  const [detailItem, setDetailItem] = useState<CheckItem | null>(null)
  const [expandedToolIds, setExpandedToolIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...checkedIds]))
  }, [checkedIds])

  useEffect(() => {
    if (detailItem) document.body.classList.add('modal-open')
    else document.body.classList.remove('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [detailItem])

  const normalizedQuery = query.trim().toLocaleLowerCase('ja')
  const searchResults = useMemo(() => {
    if (!normalizedQuery) return []
    return checkItems.filter((item) => searchableText(item).includes(normalizedQuery))
  }, [normalizedQuery])

  const selectedItems = useMemo(
    () => checkItems.filter((item) => selectedToolIds.includes(item.toolId)),
    [selectedToolIds],
  )
  const checkedCount = selectedItems.filter((item) => checkedIds.has(item.id)).length
  const progress = selectedItems.length ? Math.round((checkedCount / selectedItems.length) * 100) : 0

  const toggleTool = (toolId: string) => {
    setSelectedToolIds((current) =>
      current.includes(toolId) ? current.filter((id) => id !== toolId) : [...current, toolId],
    )
  }

  const startChecklist = () => {
    if (!selectedToolIds.length) return
    setExpandedToolIds(new Set(selectedToolIds))
    setScreen('checklist')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const addToolFromSearch = (toolId: string) => {
    setSelectedToolIds((current) => (current.includes(toolId) ? current : [...current, toolId]))
  }

  const toggleChecked = (itemId: string) => {
    setCheckedIds((current) => {
      const next = new Set(current)
      if (next.has(itemId)) next.delete(itemId)
      else next.add(itemId)
      return next
    })
  }

  const resetSelectedChecks = () => {
    if (!selectedItems.some((item) => checkedIds.has(item.id))) return
    setCheckedIds((current) => {
      const next = new Set(current)
      selectedItems.forEach((item) => next.delete(item.id))
      return next
    })
  }

  const toggleExpanded = (toolId: string) => {
    setExpandedToolIds((current) => {
      const next = new Set(current)
      if (next.has(toolId)) next.delete(toolId)
      else next.add(toolId)
      return next
    })
  }

  return (
    <div className="app-shell">
      {screen === 'home' ? (
        <HomeScreen
          selectedToolIds={selectedToolIds}
          query={query}
          searchResults={searchResults}
          onQueryChange={setQuery}
          onToggleTool={toggleTool}
          onOpenDetail={setDetailItem}
          onAddFromSearch={addToolFromSearch}
          onStart={startChecklist}
        />
      ) : (
        <ChecklistScreen
          selectedToolIds={selectedToolIds}
          selectedItems={selectedItems}
          checkedIds={checkedIds}
          checkedCount={checkedCount}
          progress={progress}
          expandedToolIds={expandedToolIds}
          onBack={() => setScreen('home')}
          onReset={resetSelectedChecks}
          onToggleChecked={toggleChecked}
          onToggleExpanded={toggleExpanded}
          onOpenDetail={setDetailItem}
        />
      )}

      {detailItem && <DetailModal item={detailItem} onClose={() => setDetailItem(null)} />}
    </div>
  )
}

type HomeProps = {
  selectedToolIds: string[]
  query: string
  searchResults: CheckItem[]
  onQueryChange: (value: string) => void
  onToggleTool: (toolId: string) => void
  onOpenDetail: (item: CheckItem) => void
  onAddFromSearch: (toolId: string) => void
  onStart: () => void
}

function HomeScreen({
  selectedToolIds,
  query,
  searchResults,
  onQueryChange,
  onToggleTool,
  onOpenDetail,
  onAddFromSearch,
  onStart,
}: HomeProps) {
  return (
    <>
      <header className="topbar home-topbar">
        <div className="brand-mark" aria-hidden="true">✓</div>
        <div>
          <h1>福祉用具チェックカンペ</h1>
          <p>現場で迷わないための点検補助</p>
        </div>
      </header>

      <main className="page-content home-content">
        <section className="intro-card">
          <div className="intro-icon" aria-hidden="true">⌕</div>
          <div>
            <p className="eyebrow">今日の確認を、手早く確実に</p>
            <h2>使っている用具を選んでください</h2>
            <p>選んだ用具だけのチェックリストを表示します。利用者情報は入力・保存しません。</p>
          </div>
        </section>

        <label className="search-box">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <span className="sr-only">用具名や気になることを検索</span>
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="用具名・問題・リスクで検索"
            inputMode="search"
            data-testid="search-input"
          />
          {query && (
            <button className="clear-search" type="button" onClick={() => onQueryChange('')} aria-label="検索を消去">
              ×
            </button>
          )}
        </label>

        {query.trim() ? (
          <SearchResults
            query={query}
            results={searchResults}
            selectedToolIds={selectedToolIds}
            onOpenDetail={onOpenDetail}
            onAddFromSearch={onAddFromSearch}
          />
        ) : (
          <section className="tool-categories" aria-labelledby="category-heading">
            <div className="section-heading">
              <div>
                <p className="eyebrow">全17用具</p>
                <h2 id="category-heading">カテゴリから選ぶ</h2>
              </div>
              <span className="selection-count">{selectedToolIds.length}件選択中</span>
            </div>

            {categoryOrder.map((category) => (
              <ToolCategorySection
                key={category}
                category={category}
                selectedToolIds={selectedToolIds}
                onToggleTool={onToggleTool}
              />
            ))}
          </section>
        )}

        <SafetyNote />
      </main>

      <div className="sticky-action">
        <button
          className="primary-button"
          type="button"
          onClick={onStart}
          disabled={!selectedToolIds.length}
          data-testid="start-checklist"
        >
          <span className="button-icon" aria-hidden="true">✓</span>
          チェックリストを表示
          <span className="button-count">{selectedToolIds.length}件</span>
        </button>
      </div>
    </>
  )
}

function ToolCategorySection({
  category,
  selectedToolIds,
  onToggleTool,
}: {
  category: ToolCategory
  selectedToolIds: string[]
  onToggleTool: (toolId: string) => void
}) {
  const categoryTools = tools.filter((tool) => tool.category === category)
  return (
    <section className="category-card">
      <div className="category-title">
        <div>
          <h3>{category}</h3>
          <p>{categoryDescriptions[category]}</p>
        </div>
        <span>{categoryTools.length}</span>
      </div>
      <div className="tool-list">
        {categoryTools.map((tool) => {
          const selected = selectedToolIds.includes(tool.id)
          return (
            <button
              key={tool.id}
              className={`tool-option ${selected ? 'is-selected' : ''}`}
              type="button"
              aria-pressed={selected}
              onClick={() => onToggleTool(tool.id)}
              data-testid={`tool-${tool.id}`}
            >
              <span className="tool-checkbox" aria-hidden="true">{selected ? '✓' : ''}</span>
              <span className="tool-icon" aria-hidden="true">{tool.icon}</span>
              <span className="tool-name">{tool.name}</span>
              <span className="chevron" aria-hidden="true">›</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

function SearchResults({
  query,
  results,
  selectedToolIds,
  onOpenDetail,
  onAddFromSearch,
}: {
  query: string
  results: CheckItem[]
  selectedToolIds: string[]
  onOpenDetail: (item: CheckItem) => void
  onAddFromSearch: (toolId: string) => void
}) {
  return (
    <section className="search-results" aria-live="polite">
      <div className="section-heading">
        <div>
          <p className="eyebrow">検索結果</p>
          <h2>「{query.trim()}」に {results.length}件</h2>
        </div>
      </div>
      {results.length === 0 ? (
        <div className="empty-state">
          <span aria-hidden="true">⌕</span>
          <h3>該当する項目がありません</h3>
          <p>「ブレーキ」「赤み」「転倒」など、短い言葉で試してください。</p>
        </div>
      ) : (
        <div className="result-list">
          {results.map((item) => {
            const selected = selectedToolIds.includes(item.toolId)
            return (
              <article className="result-card" key={item.id}>
                <div className="result-tool">
                  <span aria-hidden="true">{toolById[item.toolId].icon}</span>
                  {item.toolName}
                </div>
                <h3>{item.title}</h3>
                <p>{item.shortCheck}</p>
                <div className="risk-row compact">
                  {item.risks.slice(0, 3).map((risk) => <span className={`risk-badge ${riskClass[risk]}`} key={risk}>{risk}</span>)}
                </div>
                <div className="result-actions">
                  <button type="button" className="text-button" onClick={() => onOpenDetail(item)}>詳細を見る</button>
                  <button
                    type="button"
                    className={`add-button ${selected ? 'is-added' : ''}`}
                    onClick={() => onAddFromSearch(item.toolId)}
                    disabled={selected}
                  >
                    {selected ? '選択済み' : 'この用具を選ぶ'}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

type ChecklistProps = {
  selectedToolIds: string[]
  selectedItems: CheckItem[]
  checkedIds: Set<string>
  checkedCount: number
  progress: number
  expandedToolIds: Set<string>
  onBack: () => void
  onReset: () => void
  onToggleChecked: (itemId: string) => void
  onToggleExpanded: (toolId: string) => void
  onOpenDetail: (item: CheckItem) => void
}

function ChecklistScreen({
  selectedToolIds,
  selectedItems,
  checkedIds,
  checkedCount,
  progress,
  expandedToolIds,
  onBack,
  onReset,
  onToggleChecked,
  onToggleExpanded,
  onOpenDetail,
}: ChecklistProps) {
  return (
    <>
      <header className="topbar checklist-topbar">
        <button className="icon-button" type="button" onClick={onBack} aria-label="用具選択へ戻る">‹</button>
        <div>
          <h1>チェックリスト</h1>
          <p>{selectedToolIds.length}件の用具をチェック中</p>
        </div>
        <button className="header-action" type="button" onClick={onReset}>リセット</button>
      </header>

      <main className="page-content checklist-content">
        <section className="progress-card" aria-label={`進捗 ${checkedCount} / ${selectedItems.length}`}>
          <div className="progress-copy">
            <div>
              <span>確認済み</span>
              <strong>{checkedCount}<small> / {selectedItems.length}</small></strong>
            </div>
            <span className="progress-percent">{progress}%</span>
          </div>
          <div className="progress-track" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>
          <p>{progress === 100 ? 'すべて確認できました。気になる項目は専門職へ共有しましょう。' : '確認できた項目にチェックを入れてください。'}</p>
        </section>

        <div className="checklist-groups">
          {selectedToolIds.map((toolId) => {
            const tool = toolById[toolId]
            const items = selectedItems.filter((item) => item.toolId === toolId)
            const completeCount = items.filter((item) => checkedIds.has(item.id)).length
            const expanded = expandedToolIds.has(toolId)
            return (
              <section className="check-group" key={toolId}>
                <button className="check-group-header" type="button" onClick={() => onToggleExpanded(toolId)} aria-expanded={expanded}>
                  <span className="group-icon" aria-hidden="true">{tool.icon}</span>
                  <span className="group-title">{tool.name}</span>
                  <span className="group-count">{completeCount}/{items.length}</span>
                  <span className={`expand-icon ${expanded ? 'is-open' : ''}`} aria-hidden="true">⌄</span>
                </button>
                {expanded && (
                  <div className="check-items">
                    {items.map((item) => {
                      const checked = checkedIds.has(item.id)
                      return (
                        <article className={`check-item ${checked ? 'is-checked' : ''}`} key={item.id}>
                          <label className="check-control">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => onToggleChecked(item.id)}
                              data-testid={`check-${item.id}`}
                            />
                            <span className="custom-check" aria-hidden="true">{checked ? '✓' : ''}</span>
                            <span>{item.title}</span>
                          </label>
                          <button className="detail-button" type="button" onClick={() => onOpenDetail(item)} aria-label={`${item.title}の詳細を見る`}>
                            詳細 <span aria-hidden="true">›</span>
                          </button>
                        </article>
                      )
                    })}
                  </div>
                )}
              </section>
            )
          })}
        </div>

        <button className="secondary-button" type="button" onClick={onBack}>＋ 用具を選び直す</button>
        <SafetyNote />
      </main>
    </>
  )
}

function DetailModal({ item, onClose }: { item: CheckItem; onClose: () => void }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="detail-sheet" role="dialog" aria-modal="true" aria-labelledby="detail-title" data-testid="detail-modal">
        <div className="sheet-handle" aria-hidden="true" />
        <header className="detail-header">
          <button className="icon-button close-button" type="button" onClick={onClose} aria-label="詳細を閉じる">×</button>
          <div>
            <p>{item.toolName}</p>
            <h2 id="detail-title">{item.title}</h2>
          </div>
        </header>

        <div className="detail-body">
          <div className="risk-block">
            <span>関連するリスク</span>
            <div className="risk-row">
              {item.risks.map((risk) => <span className={`risk-badge ${riskClass[risk]}`} key={risk}>{risk}</span>)}
            </div>
          </div>

          <DetailSection icon="◉" title="見るところ" tone="blue" items={item.checkPoints} />
          <DetailSection icon="?" title="ありがちな原因" tone="slate" items={item.commonCauses} />
          <DetailSection icon="✓" title="その場でできる対応" tone="green" items={item.userActions} />
          <DetailSection icon="↗" title="専門職へ相談する内容" tone="purple" items={item.consultActions} />
          <DetailSection icon="!" title="すぐ相談したい目安" tone="amber" items={item.consultSigns} />

          <div className="do-not-card">
            <strong>危険な自己調整はしない</strong>
            <p>ねじ締め、部品交換、改造、設定変更は、取扱説明書と専門職の指示なしに行わないでください。</p>
          </div>
        </div>

        <div className="sheet-action">
          <button className="primary-button" type="button" onClick={onClose}>チェックリストへ戻る</button>
        </div>
      </section>
    </div>
  )
}

function DetailSection({ icon, title, tone, items }: { icon: string; title: string; tone: string; items: string[] }) {
  return (
    <section className={`detail-section ${tone}`}>
      <h3><span aria-hidden="true">{icon}</span>{title}</h3>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  )
}

function SafetyNote() {
  return (
    <aside className="safety-note">
      <strong><span aria-hidden="true">i</span> このアプリについて</strong>
      <p>一般的な点検補助です。個別の状態判断、医療的判断、リハビリ評価が必要な場合は、医師・看護師・PT・OT・ケアマネジャー・福祉用具専門相談員等へ相談してください。</p>
    </aside>
  )
}

export default App

import type { Tool, ToolCategory } from '../types'

export const categoryOrder: ToolCategory[] = [
  '移動系',
  'ベッド周り',
  '手すり系',
  '排泄・入浴',
  '介助負担軽減',
]

export const categoryDescriptions: Record<ToolCategory, string> = {
  移動系: '移動・外出を支える用具',
  ベッド周り: '寝起きと姿勢を支える用具',
  手すり系: '立ち座りと移動を支える用具',
  '排泄・入浴': '水回りと排泄を支える用具',
  介助負担軽減: '移乗・体位変換を支える用具',
}

export const tools: Tool[] = [
  { id: 'wheelchair', category: '移動系', name: '車イス', icon: '♿', keywords: ['車椅子', 'ブレーキ', 'フットサポート'] },
  { id: 'wheelchair-cushion', category: '移動系', name: '車イスクッション', icon: '▰', keywords: ['座位', 'クッション', '褥瘡'] },
  { id: 'walker', category: '移動系', name: '歩行器', icon: '▥', keywords: ['歩行車', 'キャスター', 'ブレーキ'] },
  { id: 'cane', category: '移動系', name: '杖', icon: '⌁', keywords: ['多点杖', '先ゴム', '高さ'] },
  { id: 'slope', category: '移動系', name: 'スロープ', icon: '◢', keywords: ['段差', '傾斜', '車イス'] },
  { id: 'special-bed', category: 'ベッド周り', name: '特殊寝台', icon: '▱', keywords: ['介護ベッド', '背上げ', '高さ'] },
  { id: 'bed-rail', category: 'ベッド周り', name: 'サイドレール／ベッド用手すり', icon: '▥', keywords: ['柵', '挟み込み', '隙間'] },
  { id: 'pressure-relief', category: 'ベッド周り', name: '床ずれ防止用具', icon: '▤', keywords: ['エアマット', '褥瘡', '赤み'] },
  { id: 'positioning', category: 'ベッド周り', name: '体位変換用具', icon: '◇', keywords: ['ポジショニング', '体位', 'クッション'] },
  { id: 'floor-rail', category: '手すり系', name: '置き型手すり', icon: 'Π', keywords: ['据置', 'ぐらつき', '立ち上がり'] },
  { id: 'wall-rail', category: '手すり系', name: '壁付け手すり', icon: '━', keywords: ['固定', 'ぐらつき', '廊下'] },
  { id: 'toilet', category: '排泄・入浴', name: 'ポータブルトイレ', icon: '▣', keywords: ['排泄', '便座', '衛生'] },
  { id: 'shower-chair', category: '排泄・入浴', name: 'シャワーチェア', icon: '♨', keywords: ['浴室', '脚ゴム', '座面'] },
  { id: 'bath-rail', category: '排泄・入浴', name: '浴槽手すり', icon: '∩', keywords: ['浴槽', '固定', 'またぎ'] },
  { id: 'bath-board', category: '排泄・入浴', name: 'バスボード／入浴台', icon: '▭', keywords: ['浴槽台', '入浴', '滑り'] },
  { id: 'lift', category: '介助負担軽減', name: '移動用リフト', icon: '↥', keywords: ['吊り具', 'スリング', '移乗'] },
  { id: 'sliding-board', category: '介助負担軽減', name: 'スライディングボード', icon: '⇥', keywords: ['移乗ボード', '滑り', '移乗'] },
]

export const toolById = Object.fromEntries(tools.map((tool) => [tool.id, tool])) as Record<string, Tool>

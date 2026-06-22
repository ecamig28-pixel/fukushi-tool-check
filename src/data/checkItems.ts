import { toolById } from './tools'
import type { CheckItem, Risk } from '../types'

type ItemInput = {
  toolId: string
  key: string
  title: string
  shortCheck: string
  checkPoints: string[]
  commonCauses: string[]
  risks: Risk[]
  userActions?: string[]
  consultActions?: string[]
  consultSigns?: string[]
}

const safeActions = [
  '無理に使い続けず、まず安全な姿勢・場所を確保する',
  '外観と取扱説明書どおりの状態かを確認する',
  '本人・家族・介助者から、いつから気になるかを聞く',
]

const professionalActions = [
  '福祉用具専門相談員または貸与事業者へ点検を依頼する',
  '必要に応じてケアマネジャーやPT・OT等と適合を見直す',
]

const defaultSigns = [
  '異音・がたつき・変形・破損がある',
  '痛み、赤み、転倒・転落の不安がある',
  '使い方や設定が本人の状態に合わない',
]

const makeItem = (input: ItemInput): CheckItem => {
  const tool = toolById[input.toolId]
  if (!tool) throw new Error(`Unknown tool: ${input.toolId}`)
  return {
    id: `${input.toolId}-${input.key}`,
    toolId: input.toolId,
    category: tool.category,
    toolName: tool.name,
    title: input.title,
    shortCheck: input.shortCheck,
    checkPoints: input.checkPoints,
    commonCauses: input.commonCauses,
    userActions: input.userActions ?? safeActions,
    consultActions: input.consultActions ?? professionalActions,
    consultSigns: input.consultSigns ?? defaultSigns,
    risks: input.risks,
  }
}

export const checkItems: CheckItem[] = [
  makeItem({ toolId: 'wheelchair', key: 'posture', title: '座面の奥まで座れ、ずり落ちがない', shortCheck: '骨盤・足位置・クッションの向きを見る', checkPoints: ['座面の奥まで座れているか', '骨盤が後ろへ倒れ、ずり落ちていないか', 'クッションの前後・裏表が正しいか', '足底がフットサポートに安定して乗っているか'], commonCauses: ['浅く座っている', '足が浮いている', '座奥行やクッションが合っていない', '疲労や体幹保持力の変化'], userActions: ['座り直しを声かけし、無理のない姿勢を整える', 'クッションの向きと足位置を確認する', '移乗後に姿勢を見てもらうよう共有する'], consultSigns: ['座り直してもすぐ崩れる', '仙骨部・坐骨部に赤みや痛みがある', '転落しそうになる', '食事や呼吸が苦しそう'], risks: ['転落', '褥瘡', '身体機能低下', '介助負担増加'] }),
  makeItem({ toolId: 'wheelchair', key: 'brakes', title: 'ブレーキが左右とも効く', shortCheck: '停止状態で左右の効きとレバーを確認する', checkPoints: ['左右のブレーキをかけ、車体が動かないか', 'レバーの遊びや異音がないか', 'タイヤの空気不足や著しい摩耗がないか'], commonCauses: ['タイヤの空気圧不足や摩耗', 'ブレーキ部の緩み・汚れ・劣化', 'ブレーキレバーの変形'], risks: ['転倒', '転落', '誤使用'] }),
  makeItem({ toolId: 'wheelchair', key: 'foot-support', title: 'フットサポートとキャスターに異常がない', shortCheck: '足位置、可動部、前輪の動きを見る', checkPoints: ['移乗時にフットサポートを上げられるか', '高さが合い、足が落ちそうでないか', 'キャスターへ毛髪やごみが絡んでいないか'], commonCauses: ['高さや角度が本人に合っていない', '可動部の固着・変形', 'キャスターへの異物の絡み'], risks: ['転倒', '痛み', '介助負担増加'] }),

  makeItem({ toolId: 'wheelchair-cushion', key: 'direction', title: '前後・裏表が正しく、ずれていない', shortCheck: '表示と形状を見て正しい位置か確認する', checkPoints: ['前後・裏表の表示どおりか', '座面から大きくずれていないか', 'カバーがしわになっていないか'], commonCauses: ['清掃後の置き間違い', '滑り止めの劣化', 'カバーの装着ずれ'], risks: ['褥瘡', '転落', '痛み'] }),
  makeItem({ toolId: 'wheelchair-cushion', key: 'condition', title: 'へたり・破れ・底付きがない', shortCheck: '形状と座ったときの沈み方を見る', checkPoints: ['目立つへたりや変形がないか', 'カバーや本体に破れ・汚れがないか', '座ったときに硬い座面へ底付きしていないか'], commonCauses: ['長期使用による劣化', '本人の体重・姿勢との不適合', '空気量や素材の状態変化'], risks: ['褥瘡', '痛み', '衛生面'] }),
  makeItem({ toolId: 'wheelchair-cushion', key: 'skin', title: '接触部に赤み・痛みがない', shortCheck: '本人の訴えと皮膚状態を確認する', checkPoints: ['仙骨部・坐骨部などに赤みがないか', '痛みやしびれの訴えがないか', '長時間同じ姿勢が続いていないか'], commonCauses: ['圧が一部に集中している', '姿勢崩れやずれ力', '皮膚の湿潤やクッションの不適合'], consultSigns: ['赤みが消えない、傷や水疱がある', '痛みが続く・強くなる', '姿勢調整でも同じ部位へ圧が集中する'], risks: ['褥瘡', '痛み'] }),

  makeItem({ toolId: 'walker', key: 'stability', title: 'フレームにぐらつき・変形がない', shortCheck: '全体を押して安定性を確認する', checkPoints: ['接合部や折りたたみ部にがたつきがないか', 'フレームに曲がりや亀裂がないか', '高さ調整部が左右同じ位置で固定されているか'], commonCauses: ['固定部の緩み', '衝突や転倒による変形', '左右で高さ設定が異なる'], risks: ['転倒', '誤使用'] }),
  makeItem({ toolId: 'walker', key: 'brakes', title: 'ブレーキ・キャスターが安全に動く', shortCheck: '左右の制動と車輪の動きを見る', checkPoints: ['左右のブレーキと駐車ブレーキが効くか', 'キャスターが引っかからず回るか', 'タイヤに摩耗・異物の絡みがないか'], commonCauses: ['ワイヤーやタイヤの劣化', '異物の絡み', 'ブレーキ操作方法の行き違い'], risks: ['転倒', '外出機会低下'] }),
  makeItem({ toolId: 'walker', key: 'fit', title: '高さと歩き方が本人に合っている', shortCheck: '前かがみ・足の接触・疲れを確認する', checkPoints: ['強い前かがみや肘の突っ張りがないか', '歩行中に足がフレームへ当たらないか', '方向転換や段差で不安定にならないか'], commonCauses: ['高さや幅が合っていない', '身体機能や歩行状態の変化', '使用環境の段差・狭さ'], risks: ['転倒', '痛み', '身体機能低下'] }),

  makeItem({ toolId: 'cane', key: 'tip', title: '先ゴムが摩耗・破損していない', shortCheck: '接地面の溝、亀裂、外れを確認する', checkPoints: ['先ゴムの溝が残っているか', '亀裂・硬化・ぐらつきがないか', '濡れた床で滑りやすくないか'], commonCauses: ['長期使用による摩耗', '屋外使用による劣化', '杖径に合わない先ゴム'], risks: ['転倒'] }),
  makeItem({ toolId: 'cane', key: 'height', title: '高さと持つ側が本人に合っている', shortCheck: '姿勢、肘の曲がり、歩き方を見る', checkPoints: ['肩が上がる・強く前かがみになる高さでないか', '本人が教わった側で使えているか', '痛みやふらつきが増えていないか'], commonCauses: ['長さ調整のずれ', '身体状態の変化', '使い方の理解違い'], risks: ['転倒', '痛み', '身体機能低下'] }),
  makeItem({ toolId: 'cane', key: 'shaft', title: '支柱・握り・調整部に異常がない', shortCheck: '曲がり、亀裂、固定状態を見る', checkPoints: ['支柱に曲がりや亀裂がないか', '握りが回転・ぐらつかないか', '長さ調整のボタンや固定環が確実か'], commonCauses: ['衝撃や過負荷', '固定部の緩み', '長期使用による劣化'], risks: ['転倒', '誤使用'] }),

  makeItem({ toolId: 'slope', key: 'placement', title: '端部が確実に掛かり、ずれない', shortCheck: '上端・下端と接地面の安定を確認する', checkPoints: ['上端が段差へ十分に掛かっているか', '下端が浮いたり滑ったりしないか', '左右差やがたつきがないか'], commonCauses: ['掛かり代不足', '接地面の凹凸や濡れ', '長さ・幅が場所に合っていない'], risks: ['転倒', '転落'] }),
  makeItem({ toolId: 'slope', key: 'surface', title: '表面に滑り・破損・障害物がない', shortCheck: '濡れ、汚れ、亀裂を確認する', checkPoints: ['表面が濡れたり汚れたりしていないか', '滑り止めの剥がれや亀裂がないか', '通路上に物が置かれていないか'], commonCauses: ['雨水・砂・ほこり', '経年劣化', '保管物による通路の狭まり'], risks: ['転倒', '転落'] }),
  makeItem({ toolId: 'slope', key: 'assist', title: '傾斜と介助方法に無理がない', shortCheck: '上り下りで速度や介助負担を見る', checkPoints: ['急すぎる傾斜になっていないか', '下りで速度を制御できているか', '介助者に強い負担や不安がないか'], commonCauses: ['スロープ長不足', '車イス重量や環境との不適合', '介助方法の確認不足'], risks: ['転落', '介助負担増加'] }),

  makeItem({ toolId: 'special-bed', key: 'operation', title: '昇降・背上げが滑らかに動く', shortCheck: '周囲を空けて異音と動きを確認する', checkPoints: ['動作前に人や物の挟み込みがないか', '異音・振動・途中停止がないか', 'コードやリモコンに傷・発熱がないか'], commonCauses: ['周囲の物との干渉', '配線や駆動部の劣化', '可動部への荷重や異物'], userActions: ['動作を止め、ベッド周囲の人と物を離す', '電源コードやリモコンを目視する', '異常があれば使用せず貸与事業者へ連絡する'], risks: ['挟み込み', '転落', '誤使用'] }),
  makeItem({ toolId: 'special-bed', key: 'height', title: '高さとブレーキが安全な状態', shortCheck: '乗り降りと介助時の高さ、脚部を見る', checkPoints: ['本人の乗り降り時に高すぎ・低すぎでないか', 'キャスターのブレーキが掛かっているか', 'ベッドが押して動かないか'], commonCauses: ['高さ設定の戻し忘れ', 'ブレーキの掛け忘れ・劣化', '床面や設置状態の問題'], risks: ['転落', '転倒', '介助負担増加'] }),
  makeItem({ toolId: 'special-bed', key: 'environment', title: 'ベッド周囲に挟み込み・転倒要因がない', shortCheck: '壁、家具、配線との隙間を見る', checkPoints: ['壁や家具との間に身体が入り得る隙間がないか', '電源コードが通路を横切っていないか', '足元に物や滑りやすい敷物がないか'], commonCauses: ['家具配置の変更', '配線の引き回し', 'ベッド位置のずれ'], risks: ['挟み込み', '転倒', '転落'] }),

  makeItem({ toolId: 'bed-rail', key: 'gap', title: '身体が挟まる隙間がない', shortCheck: '柵同士・マットレス・壁との隙間を見る', checkPoints: ['頭・首・手足が入り得る隙間がないか', 'マットレスとの間が広がっていないか', 'ベッド位置がずれて壁との危険な隙間がないか'], commonCauses: ['用具の組み合わせ違い', 'マットレスやベッド位置のずれ', '身体状態や寝返りの変化'], userActions: ['危険な隙間を見つけたらベッド周囲を安全にし、使用を中止する', 'タオル等を詰める自己流の対策はしない', '貸与事業者へ用具の組み合わせ確認を依頼する'], risks: ['挟み込み', '転落'] }),
  makeItem({ toolId: 'bed-rail', key: 'fixing', title: '差し込み・固定部にぐらつきがない', shortCheck: '浮き、外れ、変形を確認する', checkPoints: ['所定位置まで差し込まれているか', '持ったときに大きく動かないか', '曲がり・亀裂・部品欠けがないか'], commonCauses: ['差し込み不足', '固定部の摩耗・破損', '過度な荷重'], risks: ['転落', '転倒', '誤使用'] }),
  makeItem({ toolId: 'bed-rail', key: 'use', title: '乗り越え・不適切な使用がない', shortCheck: '本人の動きと設置目的を確認する', checkPoints: ['柵を乗り越えようとしていないか', '起き上がり用でない柵を強く引いていないか', '本人の理解や動きが導入時から変化していないか'], commonCauses: ['認知・身体状態の変化', '用途の理解違い', '位置や本数が本人に合っていない'], risks: ['転落', '挟み込み', '誤使用'] }),

  makeItem({ toolId: 'pressure-relief', key: 'operation', title: '電源・空気圧・表示に異常がない', shortCheck: '警報、沈み込み、チューブを見る', checkPoints: ['電源と設定表示に異常や警報がないか', '身体が底付きするほど沈んでいないか', 'チューブが折れたり抜けたりしていないか'], commonCauses: ['電源抜け・停電', 'チューブの外れや折れ', '設定や用具が本人に合っていない'], risks: ['褥瘡', '誤使用'] }),
  makeItem({ toolId: 'pressure-relief', key: 'surface', title: 'カバーにしわ・湿り・破れがない', shortCheck: '寝床内の湿潤と表面状態を見る', checkPoints: ['カバーが強くしわになっていないか', '汗や失禁で湿っていないか', '破れ・汚れ・硬化がないか'], commonCauses: ['寝具の重ねすぎ', '排泄や発汗', 'カバーの劣化・装着ずれ'], risks: ['褥瘡', '衛生面'] }),
  makeItem({ toolId: 'pressure-relief', key: 'skin', title: '皮膚の赤み・痛みがない', shortCheck: '圧がかかる部位と本人の訴えを確認する', checkPoints: ['仙骨・踵などに赤みがないか', '痛みや熱感、傷がないか', '体位変換や離床状況が変化していないか'], commonCauses: ['同じ姿勢の継続', '除圧不足やずれ力', '栄養・皮膚状態・活動量の変化'], consultSigns: ['赤みが消えない、傷や水疱がある', '痛み・熱感・腫れがある', '機器の警報や底付きが解消しない'], risks: ['褥瘡', '痛み'] }),

  makeItem({ toolId: 'positioning', key: 'position', title: '体位と支え方に無理がない', shortCheck: '呼吸、痛み、関節の位置を見る', checkPoints: ['首・肩・腰・関節に強いねじれがないか', '呼吸が苦しそうでないか', '本人が痛みや不快感を訴えていないか'], commonCauses: ['クッション位置のずれ', '身体状態の変化', '支える量や形状の不適合'], risks: ['痛み', '褥瘡', '身体機能低下'] }),
  makeItem({ toolId: 'positioning', key: 'condition', title: 'へたり・汚れ・破損がない', shortCheck: '形状保持とカバーの状態を見る', checkPoints: ['つぶれたまま戻らない部分がないか', 'カバーの破れや湿りがないか', '滑って位置がずれやすくないか'], commonCauses: ['長期使用によるへたり', '洗濯・清拭による劣化', '素材や形状の不適合'], risks: ['褥瘡', '衛生面', '痛み'] }),
  makeItem({ toolId: 'positioning', key: 'care', title: '介助方法が共有されている', shortCheck: '置く位置と向きを誰でも再現できるか確認する', checkPoints: ['クッションの種類・向き・位置が決まっているか', '家族や介助者で方法が異なっていないか', '本人の状態変化時に相談できているか'], commonCauses: ['口頭説明のみで伝わっていない', '用具の入れ替わり', '身体状態の変化'], risks: ['褥瘡', '介助負担増加', '誤使用'] }),

  makeItem({ toolId: 'floor-rail', key: 'base', title: 'ベースが浮かず、ぐらつかない', shortCheck: '床との接地と本体の安定を見る', checkPoints: ['ベース全体が床へ接しているか', '手すりを軽く揺らして大きながたつきがないか', '固定部品の外れ・変形がないか'], commonCauses: ['床の凹凸や敷物', '設置位置のずれ', '固定部の緩み・破損'], risks: ['転倒'] }),
  makeItem({ toolId: 'floor-rail', key: 'route', title: 'ベースや支柱が動線の妨げにならない', shortCheck: '足・歩行器・車イスとの接触を見る', checkPoints: ['立ち上がり時に足がベースへ当たらないか', '歩行器や車イスが支柱へぶつからないか', '夜間でも位置が分かるか'], commonCauses: ['家具や用具の配置変更', '本人の動作方法の変化', '狭い動線への設置'], risks: ['転倒', '介助負担増加'] }),
  makeItem({ toolId: 'floor-rail', key: 'fit', title: '握る位置と立ち上がり動作が合っている', shortCheck: '無理な引っ張りやねじれを確認する', checkPoints: ['強く横方向へ引いていないか', '肩や手首に痛みがないか', '立ち上がり後の一歩が安定しているか'], commonCauses: ['位置・高さ・形状の不適合', '身体機能の変化', '動作方法の変化'], risks: ['転倒', '痛み', '身体機能低下'] }),

  makeItem({ toolId: 'wall-rail', key: 'fixing', title: '固定部と壁面にぐらつき・亀裂がない', shortCheck: '根元と壁の変化を目視する', checkPoints: ['握って軽く力をかけたとき動かないか', '取付部周辺に亀裂や浮きがないか', '手すり本体に変形・ささくれがないか'], commonCauses: ['固定部や壁下地の劣化', '過度な荷重', '湿気や経年変化'], userActions: ['ぐらつきがあれば使用を止め、代わりの安全な動線を確保する', 'ねじ締めや補修を自己判断で行わない', '施工業者・福祉用具専門相談員へ連絡する'], risks: ['転倒'] }),
  makeItem({ toolId: 'wall-rail', key: 'grip', title: '握り面が滑らず、障害物がない', shortCheck: '濡れ、汚れ、物の干渉を見る', checkPoints: ['握り面が濡れたり油分で滑ったりしないか', '手すりの周囲に物が置かれていないか', '衣服やバッグが引っかからないか'], commonCauses: ['清掃後の水分', '物掛けとしての使用', '家具配置の変更'], risks: ['転倒', '誤使用'] }),
  makeItem({ toolId: 'wall-rail', key: 'use', title: '移動方向と握る位置が合っている', shortCheck: '手の届き方と足運びを見る', checkPoints: ['無理に身体を伸ばして握っていないか', '途中で手すりが途切れて不安定にならないか', '痛みやふらつきが増えていないか'], commonCauses: ['身体機能の変化', '設置位置と動線の不一致', '履物や床環境の変化'], risks: ['転倒', '痛み'] }),

  makeItem({ toolId: 'toilet', key: 'stability', title: '本体・便座・ひじ掛けが安定している', shortCheck: 'がたつき、固定、座面高さを見る', checkPoints: ['本体を押して大きく動かないか', '便座やひじ掛けが外れかけていないか', '立ち座りで足底が安定しているか'], commonCauses: ['床の凹凸', '固定部の緩み', '高さや位置の不適合'], risks: ['転倒', '介助負担増加'] }),
  makeItem({ toolId: 'toilet', key: 'route', title: '移乗動線と夜間照明が安全', shortCheck: 'ベッドからの経路と足元を見る', checkPoints: ['通路にコードや物がないか', '夜間に本体と足元が見えるか', '移乗時に身体を大きくひねらないか'], commonCauses: ['家具・用具の配置変更', '照明不足', '身体機能の変化'], risks: ['転倒', '介助負担増加'] }),
  makeItem({ toolId: 'toilet', key: 'hygiene', title: '汚れ・臭い・皮膚トラブルがない', shortCheck: 'バケツ、便座、接触部を確認する', checkPoints: ['バケツが正しく収まり、漏れがないか', '便座や周囲に汚れ・破損がないか', '皮膚の赤みや痛みがないか'], commonCauses: ['清掃・乾燥不足', '部品の装着ずれ', '長時間の座位や排泄状態の変化'], risks: ['衛生面', '痛み'] }),

  makeItem({ toolId: 'shower-chair', key: 'legs', title: '脚ゴム・固定部に異常がない', shortCheck: '滑り、摩耗、左右差を確認する', checkPoints: ['4脚が床へ接地しているか', '脚ゴムに摩耗・亀裂・外れがないか', '高さ調整部が同じ位置で固定されているか'], commonCauses: ['脚ゴムの摩耗', '高さ調整の左右差', '浴室床の凹凸'], risks: ['転倒'] }),
  makeItem({ toolId: 'shower-chair', key: 'seat', title: '座面・背もたれ・ひじ掛けが安定している', shortCheck: 'がたつき、破損、表面を見る', checkPoints: ['座面が大きく動かないか', '背もたれやひじ掛けに亀裂がないか', '表面にぬめりや鋭い傷がないか'], commonCauses: ['固定部の緩み・劣化', '清掃不足', '衝撃や長期使用'], risks: ['転倒', '衛生面', '痛み'] }),
  makeItem({ toolId: 'shower-chair', key: 'transfer', title: '座る・立つ動作に無理がない', shortCheck: '足位置、手の届き方、介助負担を見る', checkPoints: ['座る前に身体を十分近づけられるか', '足が滑らず安定しているか', '立ち上がりで強い痛みやふらつきがないか'], commonCauses: ['設置位置や高さの不適合', '浴室床の滑り', '身体機能の変化'], risks: ['転倒', '介助負担増加'] }),

  makeItem({ toolId: 'bath-rail', key: 'fixing', title: '浴槽へ確実に固定され、ぐらつかない', shortCheck: '取付部と浴槽の状態を見る', checkPoints: ['本体を軽く揺らして大きく動かないか', '取付部が浮いたりずれたりしていないか', '浴槽にひび・変形がないか'], commonCauses: ['固定部の緩み', '浴槽形状との不適合', '取付面の汚れや劣化'], userActions: ['ぐらつきがあれば使用を止める', '自己判断で締め直しや改造をせず、設置者へ連絡する', '安全な別の入浴方法を検討する'], risks: ['転倒', '誤使用'] }),
  makeItem({ toolId: 'bath-rail', key: 'surface', title: '握り部が滑らず、破損がない', shortCheck: 'ぬめり、亀裂、カバーの状態を見る', checkPoints: ['握り部に石けん・ぬめりが残っていないか', '亀裂や鋭い傷がないか', 'カバーが回転・ずれないか'], commonCauses: ['洗浄不足', '経年劣化', '過度な荷重'], risks: ['転倒', '痛み'] }),
  makeItem({ toolId: 'bath-rail', key: 'motion', title: '浴槽またぎ動作に合っている', shortCheck: '握る位置、足上げ、ふらつきを見る', checkPoints: ['無理に身体を伸ばしていないか', 'またぐ足が浴槽縁へ当たらないか', '出入り時にふらつきや恐怖感がないか'], commonCauses: ['位置・高さの不適合', '身体機能の変化', '浴槽周囲の滑り'], risks: ['転倒', '介助負担増加'] }),

  makeItem({ toolId: 'bath-board', key: 'placement', title: '浴槽縁へ安定して設置されている', shortCheck: '掛かり、ストッパー、がたつきを見る', checkPoints: ['左右が浴槽縁へ十分に掛かっているか', 'ストッパーが浴槽内側へ合っているか', '押したときにずれ・がたつきがないか'], commonCauses: ['浴槽幅との不適合', 'ストッパー位置のずれ', '取付面のぬめり'], risks: ['転倒', '転落'] }),
  makeItem({ toolId: 'bath-board', key: 'surface', title: '表面・脚部に滑りや破損がない', shortCheck: 'ぬめり、亀裂、脚ゴムを見る', checkPoints: ['座面にぬめりや石けんがないか', '亀裂・たわみ・変形がないか', '浴槽台の脚ゴムが摩耗していないか'], commonCauses: ['清掃不足', '長期使用による劣化', '保管時の変形'], risks: ['転倒', '衛生面'] }),
  makeItem({ toolId: 'bath-board', key: 'transfer', title: '移乗と浴槽内への出入りが安全', shortCheck: '座位、足運び、介助スペースを見る', checkPoints: ['座った姿勢が安定しているか', '足を浴槽内へ移す動作に無理がないか', '介助者が安全な位置を取れるか'], commonCauses: ['高さ・幅の不適合', '身体機能の変化', '浴室内のスペース不足'], risks: ['転倒', '介助負担増加'] }),

  makeItem({ toolId: 'lift', key: 'sling', title: '吊り具に破れ・ほつれ・装着違いがない', shortCheck: 'タグ、縫い目、フック接続を見る', checkPoints: ['本人用の種類・サイズか', '布や縫い目に破れ・ほつれがないか', '全てのストラップが指定位置へ掛かっているか'], commonCauses: ['吊り具の取り違え', '摩耗・洗濯による劣化', '掛け位置の確認不足'], userActions: ['異常があれば吊り上げず、本人を安全な姿勢に戻す', '取扱説明書と事業者の指導どおりの装着か確認する', '破損した吊り具を補修して使わない'], risks: ['転落', '挟み込み', '誤使用'] }),
  makeItem({ toolId: 'lift', key: 'operation', title: '本体・昇降・緊急機能に異常がない', shortCheck: '使用前に無負荷で動作と表示を見る', checkPoints: ['異音・振動・警報がないか', '充電・電池表示に問題がないか', '緊急停止・下降方法を介助者が把握しているか'], commonCauses: ['充電不足', '駆動部・配線の劣化', '操作方法の引き継ぎ不足'], risks: ['転落', '介助負担増加', '誤使用'] }),
  makeItem({ toolId: 'lift', key: 'environment', title: '移乗経路と介助スペースが確保されている', shortCheck: '脚部・家具・コードの干渉を見る', checkPoints: ['脚部やアームが家具へ当たらないか', '床に段差や障害物がないか', '介助者が無理な姿勢になっていないか'], commonCauses: ['家具配置の変更', '狭い動線', '移乗方法と環境の不一致'], risks: ['転落', '介助負担増加'] }),

  makeItem({ toolId: 'sliding-board', key: 'surface', title: '表面と端部に破損・汚れがない', shortCheck: '亀裂、ささくれ、滑り面を見る', checkPoints: ['亀裂・欠け・大きな反りがないか', '表面に汚れや粘着物がないか', '端部が皮膚へ当たって痛くないか'], commonCauses: ['衝撃や過負荷', '清掃方法による劣化', '保管時の変形'], risks: ['転落', '痛み', '衛生面'] }),
  makeItem({ toolId: 'sliding-board', key: 'placement', title: '両側へ十分に掛かり、ずれない', shortCheck: '車イスとベッド等への掛かりを確認する', checkPoints: ['移乗元・移乗先へ十分に掛かっているか', '車イスのブレーキが掛かっているか', '高さ差や隙間が大きすぎないか'], commonCauses: ['掛かり不足', 'ブレーキの掛け忘れ', '高さ・距離の不適合'], risks: ['転落', '転倒'] }),
  makeItem({ toolId: 'sliding-board', key: 'method', title: '移乗方法が本人と介助者に合っている', shortCheck: '姿勢、皮膚、介助負担を見る', checkPoints: ['本人が安定した座位を保てるか', '皮膚を強くこすっていないか', '介助者が引き上げるような無理をしていないか'], commonCauses: ['身体機能の変化', 'ボード形状や長さの不適合', '介助方法の共有不足'], risks: ['転落', '痛み', '介助負担増加'] }),
]

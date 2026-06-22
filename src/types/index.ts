export type ToolCategory =
  | '移動系'
  | 'ベッド周り'
  | '手すり系'
  | '排泄・入浴'
  | '介助負担軽減'

export type Risk =
  | '転倒'
  | '転落'
  | '褥瘡'
  | '誤使用'
  | '身体機能低下'
  | '介助負担増加'
  | '痛み'
  | '挟み込み'
  | '衛生面'
  | '外出機会低下'

export type Tool = {
  id: string
  category: ToolCategory
  name: string
  icon: string
  keywords: string[]
}

export type CheckItem = {
  id: string
  toolId: string
  category: ToolCategory
  toolName: string
  title: string
  shortCheck: string
  checkPoints: string[]
  commonCauses: string[]
  userActions: string[]
  consultActions: string[]
  consultSigns: string[]
  risks: Risk[]
}

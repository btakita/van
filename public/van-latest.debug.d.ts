export interface State<T> extends StateView<T> {
  val: T
}

// Defining readonly view of State<T> for covariance.
// Basically we want State<string> implements StateView<string | number>
export interface StateView<T> {
  readonly val: T
  readonly oldVal: T
}

declare function val<T>(s: T | StateView<T>): T
declare function oldVal<T>(s: T | StateView<T>): T

export type Primitive = string | number | boolean | bigint

export type PropValue = Primitive | EventListener | null

export interface Props {
  readonly [key: string]: PropValue | StateView<PropValue> | (() => PropValue)
}

export type ChildDom = Primitive | Node | StateView<Primitive | null | undefined> | ((dom: Node) => Primitive | Node | null | undefined) | readonly ChildDom[] | null | undefined

export type TagFunc<Result> = (first?: Props | ChildDom, ...rest: readonly ChildDom[]) => Result

interface TagsBase {
  readonly [key: string]: TagFunc<Element>
}

interface Tags extends TagsBase {
  // Register known element types
  // Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Element

  // Main root
  readonly html: TagFunc<HTMLHtmlElement>

  // Document metadata
  readonly base: TagFunc<HTMLBaseElement>
  readonly head: TagFunc<HTMLHeadElement>
  readonly link: TagFunc<HTMLLinkElement>
  readonly meta: TagFunc<HTMLMetaElement>
  readonly style: TagFunc<HTMLStyleElement>
  readonly title: TagFunc<HTMLTitleElement>

  // Sectioning root
  readonly body: TagFunc<HTMLBodyElement>

  // Content sectioning
  readonly h1: TagFunc<HTMLHeadingElement>
  readonly h2: TagFunc<HTMLHeadingElement>
  readonly h3: TagFunc<HTMLHeadingElement>
  readonly h4: TagFunc<HTMLHeadingElement>
  readonly h5: TagFunc<HTMLHeadingElement>
  readonly h6: TagFunc<HTMLHeadingElement>

  // Text content
  readonly blockquote: TagFunc<HTMLQuoteElement>
  readonly div: TagFunc<HTMLDivElement>
  readonly dl: TagFunc<HTMLDListElement>
  readonly hr: TagFunc<HTMLHRElement>
  readonly li: TagFunc<HTMLLIElement>
  readonly menu: TagFunc<HTMLMenuElement>
  readonly ol: TagFunc<HTMLOListElement>
  readonly p: TagFunc<HTMLParagraphElement>
  readonly pre: TagFunc<HTMLPreElement>
  readonly ul: TagFunc<HTMLUListElement>

  // Inline text semantics
  readonly a: TagFunc<HTMLAnchorElement>
  readonly br: TagFunc<HTMLBRElement>
  readonly data: TagFunc<HTMLDataElement>
  readonly q: TagFunc<HTMLQuoteElement>
  readonly span: TagFunc<HTMLSpanElement>
  readonly time: TagFunc<HTMLTimeElement>

  // Image and multimedia
  readonly area: TagFunc<HTMLAreaElement>
  readonly audio: TagFunc<HTMLAudioElement>
  readonly img: TagFunc<HTMLImageElement>
  readonly map: TagFunc<HTMLMapElement>
  readonly track: TagFunc<HTMLTrackElement>
  readonly video: TagFunc<HTMLVideoElement>

  // Embedded content
  readonly embed: TagFunc<HTMLEmbedElement>
  readonly iframe: TagFunc<HTMLIFrameElement>
  readonly object: TagFunc<HTMLObjectElement>
  readonly picture: TagFunc<HTMLPictureElement>
  readonly source: TagFunc<HTMLSourceElement>

  // Scripting
  readonly canvas: TagFunc<HTMLCanvasElement>
  readonly script: TagFunc<HTMLScriptElement>

  // Demarcating edits
  readonly del: TagFunc<HTMLModElement>
  readonly ins: TagFunc<HTMLModElement>

  // Table content
  readonly caption: TagFunc<HTMLTableCaptionElement>
  readonly col: TagFunc<HTMLTableColElement>
  readonly colgroup: TagFunc<HTMLTableColElement>
  readonly table: TagFunc<HTMLTableElement>
  readonly tbody: TagFunc<HTMLTableSectionElement>
  readonly td: TagFunc<HTMLTableCellElement>
  readonly tfoot: TagFunc<HTMLTableSectionElement>
  readonly th: TagFunc<HTMLTableCellElement>
  readonly thead: TagFunc<HTMLTableSectionElement>
  readonly tr: TagFunc<HTMLTableRowElement>

  // Forms
  readonly button: TagFunc<HTMLButtonElement>
  readonly datalist: TagFunc<HTMLDataListElement>
  readonly fieldset: TagFunc<HTMLFieldSetElement>
  readonly form: TagFunc<HTMLFormElement>
  readonly input: TagFunc<HTMLInputElement>
  readonly label: TagFunc<HTMLLabelElement>
  readonly legend: TagFunc<HTMLLegendElement>
  readonly meter: TagFunc<HTMLMeterElement>
  readonly optgroup: TagFunc<HTMLOptGroupElement>
  readonly option: TagFunc<HTMLOptionElement>
  readonly output: TagFunc<HTMLOutputElement>
  readonly progress: TagFunc<HTMLProgressElement>
  readonly select: TagFunc<HTMLSelectElement>
  readonly textarea: TagFunc<HTMLTextAreaElement>

  // Interactive elements
  readonly details: TagFunc<HTMLDetailsElement>
  readonly dialog: TagFunc<HTMLDialogElement>

  // Web Components
  readonly slot: TagFunc<HTMLSlotElement>
  readonly template: TagFunc<HTMLTemplateElement>
}

export interface Van {
  readonly state: <T>(initVal: T) => State<T>
  readonly val: typeof val
  readonly oldVal: typeof oldVal
  readonly effect: (f: () => void) => void
  readonly add: (dom: Element, ...children: readonly ChildDom[]) => Element
  readonly tags: Tags
  readonly tagsNS: (namespaceURI: string) => TagsBase
}

declare const van: Van

export default van

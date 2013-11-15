start = media_query

media_query
  = mt:media_type S* "and" S* mq:media_query { return [{ value: mt, type: "media_type"}, mq]; }
  / mt:media_type { return { value: mt, type: "media_type" }; }
  / "only" S* mt:media_type S* "and" S* exp:expression { return [{ value: mt, type: "media_type", only: true}, exp]; }
  / "only" S* mt:media_type { return { value: mt, type: "media_type", only: true }; }
  / "not" S* mt:media_type S* "and" S* exp:expression { return [{ value: mt, type: "media_type", not: true}, exp]; }
  / "not" S* mt:media_type { return { value: mt, type: "media_type", not: true }; }
  / exp1:expression S* "and" S* exp2:expression { return [exp1, exp2]; }
  / expression

media_type = "all" / "aural" / "braille" / "handheld" / "print" / "projection" / "screen" / "tty" / "tv" / "embossed"

expression
  = "(" S* feature:media_feature ":" S* value:value S* ")" { return { feature: feature, value: value, type: "feature" }; }
  / "(" S* feature:media_feature S* ")" { return { feature: feature, type: "feature" }; }

media_feature
  = "width" / "min-width" / "max-width"
  / "height" / "min-height" / "max-height"
  / "device-width" / "min-device-width" / "max-device-width"
  / "device-height" / "min-device-height" / "max-device-height"
  / "aspect-ratio" / "min-aspect-ratio" / "max-aspect-ratio"
  / "device-aspect-ratio" / "min-device-aspect-ratio" / "max-device-aspect-ratio"
  / "color" / "min-color" / "max-color"
  / "color-index" / "min-color-index" / "max-color-index"
  / "monochrome" / "min-monochrome" / "max-monochrome"
  / "resolution" / "min-resolution" / "max-resolution"
  / "scan" / "grid"

value
  = num:number S* "/" S* den:number { return { numerator: num, denominator: den, type: "ratio" }; }
  / number:number unit:unit { return { value: number, unit: unit, type: "number" }; }
  / number:number { return { number: number, type: "number" }; }

number
  = number:[0-9.]+ { return parseFloat(number.join(""), 10); }

unit
  = "px" / "rem" / "em" / "dpi" / "dpcm"

S = " "
  / "\t"

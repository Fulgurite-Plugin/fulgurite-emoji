// GitHub-style emoji shortcodes: typing the closing colon of `:smile:` puts 😄 in the note.
// The note keeps the emoji itself (no preview to render shortcodes in), so it reads the same everywhere.
import { nameToEmoji } from "gemoji"
import type { Plugin } from "fulgurite"

/** `:name` right before the cursor, on the current line. Names are gemoji's: letters, digits, `_`, `+`, `-`. */
const SHORTCODE = /:([\w+-]+)$/

const plugin: Plugin = {
  onLoad(ctx) {
    ctx.editor.registerExtension({
      onKey(key, view) {
        if (key !== ":" || view.selection) return false
        const line = view.text.slice(view.text.lastIndexOf("\n", view.cursor - 1) + 1, view.cursor)
        const match = SHORTCODE.exec(line)
        const emoji = match && nameToEmoji[match[1]!]
        if (!emoji) return false
        view.replace(view.cursor - match[0].length, view.cursor, emoji)
        return true
      },
    })
  },
}

export default plugin

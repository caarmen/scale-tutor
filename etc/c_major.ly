\version "2.20.0"

#(set! paper-alist (cons '("my size" . (cons (* 10 cm) (* 2 cm))) paper-alist))

\paper {
  left-margin = 0
  right-margin = 0
  horizontal-shift = -2.5
  #(set-paper-size "my size")
}

\header {
  tagline = ""  % removed
}

\transpose c c {
  \relative c {
    \key c \major
      <c' c'> <d d'> <e e'> <f f'> <g g'> <a a'> <b b'> <c c'> <b b'> <a a'> <g g'> <f f'> <e e'> <d d'> <c c'> r
  }
}


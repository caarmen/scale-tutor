\version "2.20.0"

#(set! paper-alist (cons '("my size" . (cons (* 12 cm) (* 3.5 cm))) paper-alist))

\paper {
  left-margin = 0
  right-margin = 0
  horizontal-shift = -2.5
  #(set-paper-size "my size")
}

\header {
  tagline = ""  % removed
}

\transpose a a {
  \relative a {
    \key a \minor
      <a a' a'> <b b' b'> <c c' c'> <d d' d'> <e e' e'> <f f' f'> <g g' g'> <a a' a'> <g g' g'> <f f' f'> <e e' e'> <d d' d'> <c c' c'> <b b' b'> <a a' a'> r
  }
}


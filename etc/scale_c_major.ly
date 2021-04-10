#(set! paper-alist (cons '("my size" . (cons (* 10 cm) (* 1.7 cm))) paper-alist))

\paper {
  left-margin = 0
  right-margin = 0
  horizontal-shift = -2.5
  #(set-paper-size "my size")
}

\header {
  tagline = ""  % removed
}
\relative {
  c' d e f g a b c b a g f e d c r
}


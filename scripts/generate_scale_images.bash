lilypond_major_notes=(   c des d ees e f ges g aes a bes b)
lilypond_minor_notes=(   c\' cis\' d\' dis\' e\' f\' fis\' g\' gis\' a bes b)
scale_tutor_notes=(      c cs  d ds  e f fs  g gs  a as  b)

for i in ${!lilypond_major_notes[@]}; do
  sed -e "s/transpose c c/transpose c ${lilypond_major_notes[$i]}/" etc/c_major.ly > /tmp/temp.ly
  lilypond -dbackend=svg -o src/resources/${scale_tutor_notes[$i]}_major /tmp/temp.ly
done

for i in ${!lilypond_minor_notes[@]}; do
  sed -e "s/transpose a a/transpose a ${lilypond_minor_notes[$i]}/" etc/a_natural_minor.ly > /tmp/temp.ly
  lilypond -dbackend=svg -o src/resources/${scale_tutor_notes[$i]}_natural_minor /tmp/temp.ly
done

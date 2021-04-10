lilypond_notes=(   c des d ees e f ges g aes a bes b)
scale_tutor_notes=(c cs  d ds  e f fs  g gs  a as  b)

for i in ${!lilypond_notes[@]}; do
  #echo "${lilypond_notes[$i]} ${scale_tutor_notes[$i]}"
  sed -e "s/transpose c c/transpose c ${lilypond_notes[$i]}/" etc/c_major.ly > /tmp/temp.ly
  lilypond -dbackend=svg -o src/resources/${scale_tutor_notes[$i]}_major /tmp/temp.ly
done

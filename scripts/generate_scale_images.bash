lilypond_major_notes=(     c   des   d   ees   e   f   ges   g   aes,   a,   bes,   b,)
lilypond_minor_notes=(     c\' cis\' d\' ees\' e\' f\' fis\' g\' aes\' a   bes   b)
lilypond_minor_bass_notes=(c\' cis\' d\' ees\' e\' f\' fis\' g\' aes\' a\' bes\' b\')
scale_tutor_notes=(        c   cs    d   ds    e   f   fs    g   gs    a   as    b)

for i in ${!lilypond_major_notes[@]}; do
  echo "${scale_tutor_notes[$i]} major"

  sed -e "s/transpose c c/transpose c ${lilypond_major_notes[$i]}/" etc/c_major.ly > /tmp/temp.ly
  lilypond -dbackend=svg -o src/resources/${scale_tutor_notes[$i]}_major_treble /tmp/temp.ly > /dev/null 2>&1

  sed -e "s/transpose c c/transpose c' ${lilypond_major_notes[$i]}/;s/\\\\key c \\\\major/\\\\key c \\\\major \\\\clef alto/" etc/c_major.ly > /tmp/temp.ly
  lilypond -dbackend=svg -o src/resources/${scale_tutor_notes[$i]}_major_alto /tmp/temp.ly > /dev/null 2>&1

  sed -e "s/transpose c c/transpose c'' ${lilypond_major_notes[$i]}/;s/\\\\key c \\\\major/\\\\key c \\\\major \\\\clef bass/" etc/c_major.ly > /tmp/temp.ly
  lilypond -dbackend=svg -o src/resources/${scale_tutor_notes[$i]}_major_bass /tmp/temp.ly > /dev/null 2>&1
done

for minor_type in natural harmonic melodic; do
  for i in ${!lilypond_minor_notes[@]}; do
    echo "${scale_tutor_notes[$i]} ${minor_type} minor"

    sed -e "s/transpose a a/transpose a ${lilypond_minor_notes[$i]}/" etc/a_${minor_type}_minor.ly > /tmp/temp.ly
    lilypond -dbackend=svg -o src/resources/${scale_tutor_notes[$i]}_${minor_type}_minor_treble /tmp/temp.ly >/dev/null 2>&1

    sed -e "s/transpose a a/transpose a' ${lilypond_minor_bass_notes[$i]}/;s/\\\\key a \\\\minor/\\\\key a \\\\minor\\\\clef alto/" etc/a_${minor_type}_minor.ly > /tmp/temp.ly
    lilypond -dbackend=svg -o src/resources/${scale_tutor_notes[$i]}_${minor_type}_minor_alto /tmp/temp.ly >/dev/null 2>&1

    sed -e "s/transpose a a/transpose a'' ${lilypond_minor_bass_notes[$i]}/;s/\\\\key a \\\\minor/\\\\key a \\\\minor\\\\clef bass/" etc/a_${minor_type}_minor.ly > /tmp/temp.ly
    lilypond -dbackend=svg -o src/resources/${scale_tutor_notes[$i]}_${minor_type}_minor_bass /tmp/temp.ly > /dev/null 2>&1
  done
done


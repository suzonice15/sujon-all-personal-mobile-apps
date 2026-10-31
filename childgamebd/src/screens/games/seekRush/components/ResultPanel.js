import React from 'react';
import { GC, LevelResultPanel } from '../../../../components/game';
import { RESULT_TEXT, ROUNDS_PER_LEVEL, formatTime } from '../../../../data/game02_wordSeekRush';
import { toBanglaDigits } from '../../../../utils/banglaNumber';

const CHECK = require('../../../../assets/images/common/check_mark.webp');
const CROSS = require('../../../../assets/images/common/cross_mark.webp');
const CLOCK = require('../../../../assets/images/common/alarm_clock.webp');

export default function ResultPanel({ levelNumber, unit, correct, seconds, stars, ...actions }) {
  return (
    <LevelResultPanel
      levelNumber={levelNumber}
      stars={stars}
      stats={[
        {
          key: 'right',
          image: CHECK,
          label: 'সঠিক',
          value: `${toBanglaDigits(correct)} / ${toBanglaDigits(ROUNDS_PER_LEVEL)}`,
          color: GC.greenDark,
        },
        { key: 'wrong', image: CROSS, label: 'ভুল', value: toBanglaDigits(ROUNDS_PER_LEVEL - correct), color: GC.redDark },
        { key: 'time', image: CLOCK, label: 'সময়', value: formatTime(seconds), color: GC.ink },
      ]}
      passText={`তুমি খুব মনোযোগ দিয়ে ${unit} খুঁজেছো!`}
      failText={`পরের লেভেল খুলতে অন্তত ৫টি সঠিক ${unit} খুঁজে বের করো।`}
      hint={RESULT_TEXT.tryAgain}
      {...actions}
    />
  );
}

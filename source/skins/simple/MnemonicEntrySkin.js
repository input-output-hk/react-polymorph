// @flow
import React from 'react';
import type { Element } from 'react';

// external libraries
import classnames from 'classnames';

type Props = {
  activeColumn: number | null,
  className: string,
  label: string | Element<any>,
  mnemonicWords: Array<string>,
  theme: Object,
  themeId: string,
  totalColumns: number,
  totalWords: number,
  totalWordsEntered: number,
};

export const MnemonicEntrySkin = (props: Props) => {
 const {
  activeColumn,
  className,
  label,
  mnemonicWords,
  themeId,
  totalColumns,
  totalWords,
  totalWordsEntered,
 } = props;
 const theme = props.theme[themeId];

 return (
   <div className={classnames([className, theme.root])}>
     <div className={theme.labelWrapper}>
       {label && (
         <label
           role="presentation"
           aria-hidden
           className={theme.label}
         >
           {label}
         </label>
      )}
       {totalWords && (
         <label
           role="presentation"
           aria-hidden
           className={theme.totalWords}
         >
           {totalWordsEntered} of {totalWords} words entered
         </label>
      )}
     </div>
   </div>
 );
};

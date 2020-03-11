// @flow
import React from 'react';
import type { Element } from 'react';

// external libraries
import classnames from 'classnames';
import { times } from 'lodash';

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
           className={theme.wordsEntered}
         >
           {totalWordsEntered} of {totalWords} words entered
         </label>
      )}
     </div>
     <div className={theme.columnsWrapper}>
       {times(totalColumns, () => (
         <div className={theme.column}>
           <ol>
             <li>1.___</li>
             <li>2.___</li>
             <li>3.___</li>
             <li>4.___</li>
             <li>5.___</li>
           </ol>
         </div>
       ))}
     </div>
   </div>
 );
};

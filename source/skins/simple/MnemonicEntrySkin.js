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
  mnemonicWords: Object,
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

 const renderInnerColumn = (columnNumber: number) => {
  const wordsPerColumn = totalWords / totalColumns;
  return (
    <ul>
      {times(wordsPerColumn, (iteree) => {
        const wordNumber = wordsPerColumn * columnNumber + (iteree + 1);
        return (
          <li className={theme.word}>
            {wordNumber}. {mnemonicWords[wordNumber]}
          </li>
        );
      })}
    </ul>
  );
};

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
       {times(totalColumns, (columnNumber) => (
         <div className={theme.column}>
           {renderInnerColumn(columnNumber)}
         </div>
       ))}
     </div>
   </div>
 );
};

// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

// components
import { Autocomplete } from '../source/components/Autocomplete';
import { Select } from '../source/components/Select';
import { Options } from '../source/components/Options';

// themes
import CustomOptionsTheme from './theme-customizations/Options.custom.scss';

// helpers
import { decorateWithSimpleTheme } from './helpers/theming';

const OPTIONS_COLLECTION = [
  { value: '1', label: 'Afghanistan' },
  { value: '2', label: 'Albania' },
  { value: '3', label: 'Algeria' },
  { value: '4', label: 'Andorra' },
  { value: '5', label: 'Angola' },
  { value: '6', label: 'Antigua and Barbuda' },
  { value: '7', label: 'Argentina' },
  { value: '8', label: 'Armenia' },
  { value: '9', label: 'Australia' },
  { value: '10', label: 'Austria' },
  { value: '11', label: 'Azerbaijan' },
  { value: '12', label: 'Bahamas' },
  { value: '13', label: 'Bahrain' },
  { value: '14', label: 'Bangladesh' },
  { value: '15', label: 'Barbados' },
  { value: '16', label: 'Belarus' },
  { value: '17', label: 'Belgium' },
  { value: '18', label: 'Belize' },
  { value: '19', label: 'Benin' },
  { value: '20', label: 'Bhutan' },
  { value: '21', label: 'Bolivia' },
  { value: '22', label: 'Bosnia and Herzegovina' },
  { value: '23', label: 'Botswana' },
  { value: '24', label: 'Brazil' },
  { value: '25', label: 'Brunei' },
  { value: '26', label: 'Bulgaria' },
  { value: '27', label: 'Burkina Faso' },
  { value: '28', label: 'Burundi' },
  { value: '29', label: 'Côte d\'Ivoire' },
  { value: '30', label: 'Cabo Verde' },
  { value: '31', label: 'Cambodia' },
  { value: '32', label: 'Cameroon' },
  { value: '33', label: 'Canada' },
  { value: '34', label: 'Central African Republic' },
  { value: '35', label: 'Chad' },
  { value: '36', label: 'Chile' },
  { value: '37', label: 'China' },
  { value: '38', label: 'Colombia' },
  { value: '39', label: 'Comoros' },
  { value: '40', label: 'Congo (Congo-Brazzaville)' },
  { value: '41', label: 'Costa Rica' },
  { value: '42', label: 'Croatia' },
  { value: '43', label: 'Cuba' },
  { value: '44', label: 'Cyprus' },
  { value: '45', label: 'Czechia (Czech Republic)' },
  { value: '46', label: 'Democratic Republic of the Congo' },
  { value: '47', label: 'Denmark' },
  { value: '48', label: 'Djibouti' },
  { value: '49', label: 'Dominica' },
  { value: '50', label: 'Dominican Republic' },
  { value: '51', label: 'Ecuador' },
  { value: '52', label: 'Egypt' },
  { value: '53', label: 'El Salvador' },
  { value: '54', label: 'Equatorial Guinea' },
  { value: '55', label: 'Eritrea' },
  { value: '56', label: 'Estonia' },
  { value: '57', label: 'Eswatini (fmr. "Swaziland")' },
  { value: '58', label: 'Ethiopia' },
  { value: '59', label: 'Fiji' },
  { value: '60', label: 'Finland' },
  { value: '61', label: 'France' },
  { value: '62', label: 'Gabon' },
  { value: '63', label: 'Gambia' },
  { value: '64', label: 'Georgia' },
  { value: '65', label: 'Germany' },
  { value: '66', label: 'Ghana' },
  { value: '67', label: 'Greece' },
  { value: '68', label: 'Grenada' },
  { value: '69', label: 'Guatemala' },
  { value: '70', label: 'Guinea' },
  { value: '71', label: 'Guinea-Bissau' },
  { value: '72', label: 'Guyana' },
  { value: '73', label: 'Haiti' },
  { value: '74', label: 'Holy See' },
  { value: '75', label: 'Honduras' },
  { value: '76', label: 'Hungary' },
  { value: '77', label: 'Iceland' },
  { value: '78', label: 'India' },
  { value: '79', label: 'Indonesia' },
  { value: '80', label: 'Iran' },
  { value: '81', label: 'Iraq' },
  { value: '82', label: 'Ireland' },
  { value: '83', label: 'Israel' },
  { value: '84', label: 'Italy' },
  { value: '85', label: 'Jamaica' },
  { value: '86', label: 'Japan' },
  { value: '87', label: 'Jordan' },
  { value: '88', label: 'Kazakhstan' },
  { value: '89', label: 'Kenya' },
  { value: '90', label: 'Kiribati' },
  { value: '91', label: 'Kuwait' },
  { value: '92', label: 'Kyrgyzstan' },
  { value: '93', label: 'Laos' },
  { value: '94', label: 'Latvia' },
  { value: '95', label: 'Lebanon' },
  { value: '96', label: 'Lesotho' },
  { value: '97', label: 'Liberia' },
  { value: '98', label: 'Libya' },
  { value: '99', label: 'Liechtenstein' },
  { value: '100', label: 'Lithuania' },
  { value: '101', label: 'Luxembourg' },
  { value: '102', label: 'Madagascar' },
  { value: '103', label: 'Malawi' },
  { value: '104', label: 'Malaysia' },
  { value: '105', label: 'Maldives' },
  { value: '106', label: 'Mali' },
  { value: '107', label: 'Malta' },
  { value: '108', label: 'Marshall Islands' },
  { value: '109', label: 'Mauritania' },
  { value: '110', label: 'Mauritius' },
  { value: '111', label: 'Mexico' },
  { value: '112', label: 'Micronesia' },
  { value: '113', label: 'Moldova' },
  { value: '114', label: 'Monaco' },
  { value: '115', label: 'Mongolia' },
  { value: '116', label: 'Montenegro' },
  { value: '117', label: 'Morocco' },
  { value: '118', label: 'Mozambique' },
  { value: '119', label: 'Myanmar (formerly Burma)' },
  { value: '120', label: 'Namibia' },
  { value: '121', label: 'Nauru' },
  { value: '122', label: 'Nepal' },
  { value: '123', label: 'Netherlands' },
  { value: '124', label: 'New Zealand' },
  { value: '125', label: 'Nicaragua' },
  { value: '126', label: 'Niger' },
  { value: '127', label: 'Nigeria' },
  { value: '128', label: 'North Korea' },
  { value: '129', label: 'North Macedonia' },
  { value: '130', label: 'Norway' },
  { value: '131', label: 'Oman' },
  { value: '132', label: 'Pakistan' },
  { value: '133', label: 'Palau' },
  { value: '134', label: 'Palestine State' },
  { value: '135', label: 'Panama' },
  { value: '136', label: 'Papua New Guinea' },
  { value: '137', label: 'Paraguay' },
  { value: '138', label: 'Peru' },
  { value: '139', label: 'Philippines' },
  { value: '140', label: 'Poland' },
  { value: '141', label: 'Portugal' },
  { value: '142', label: 'Qatar' },
  { value: '143', label: 'Romania' },
  { value: '144', label: 'Russia' },
  { value: '145', label: 'Rwanda' },
  { value: '146', label: 'Saint Kitts and Nevis' },
  { value: '147', label: 'Saint Lucia' },
  { value: '148', label: 'Saint Vincent and the Grenadines' },
  { value: '149', label: 'Samoa' },
  { value: '150', label: 'San Marino' },
  { value: '151', label: 'Sao Tome and Principe' },
  { value: '152', label: 'Saudi Arabia' },
  { value: '153', label: 'Senegal' },
  { value: '154', label: 'Serbia' },
  { value: '155', label: 'Seychelles' },
  { value: '156', label: 'Sierra Leone' },
  { value: '157', label: 'Singapore' },
  { value: '158', label: 'Slovakia' },
  { value: '159', label: 'Slovenia' },
  { value: '160', label: 'Solomon Islands' },
  { value: '161', label: 'Somalia' },
  { value: '162', label: 'South Africa' },
  { value: '163', label: 'South Korea' },
  { value: '164', label: 'South Sudan' },
  { value: '165', label: 'Spain' },
  { value: '166', label: 'Sri Lanka' },
  { value: '167', label: 'Sudan' },
  { value: '168', label: 'Suriname' },
  { value: '169', label: 'Sweden' },
  { value: '170', label: 'Switzerland' },
  { value: '171', label: 'Syria' },
  { value: '172', label: 'Tajikistan' },
  { value: '173', label: 'Tanzania' },
  { value: '174', label: 'Thailand' },
  { value: '175', label: 'Timor-Leste' },
  { value: '176', label: 'Togo' },
  { value: '177', label: 'Tonga' },
  { value: '178', label: 'Trinidad and Tobago' },
  { value: '179', label: 'Tunisia' },
  { value: '180', label: 'Turkey' },
  { value: '181', label: 'Turkmenistan' },
  { value: '182', label: 'Tuvalu' },
  { value: '183', label: 'Uganda' },
  { value: '184', label: 'Ukraine' },
  { value: '185', label: 'United Arab Emirates' },
  { value: '186', label: 'United Kingdom' },
  { value: '187', label: 'United States of America' },
  { value: '188', label: 'Uruguay' },
  { value: '189', label: 'Uzbekistan' },
  { value: '190', label: 'Vanuatu' },
  { value: '191', label: 'Venezuela' },
  { value: '192', label: 'Vietnam' },
  { value: '193', label: 'Yemen' },
  { value: '194', label: 'Zambia' },
  { value: '195', label: 'Zimbabwe' },
];

const MNEMONIC_WORDS = [
  'home',
  'cat',
  'dog',
  'fish',
  'hide',
  'hover',
  'duck',
  'category',
  'join',
  'paper',
  'box',
  'tab'
];

storiesOf('Options', module)

  .addDecorator(decorateWithSimpleTheme)

  // ====== Stories ======

  .add('combined with Input to construct Select',
    withState({ value: '' }, store => (
      <Select
        value={store.state.value}
        onChange={value => store.set({ value })}
        options={OPTIONS_COLLECTION}
      />
    ))
  )

  .add('combined with Input to construct Autocomplete',
    withState({ selectedOpts: [] }, store => (
      <Autocomplete
        label="Recovery phrase"
        options={MNEMONIC_WORDS}
        placeholder="Enter mnemonic..."
        maxSelections={9}
        maxVisibleOptions={5}
        invalidCharsRegex={/[^a-zA-Z\s]/g}
        onChange={selectedOpts => store.set({ selectedOpts })}
      />
    ))
  )

  .add('custom theme', () => (
    <Options
      theme={CustomOptionsTheme}
      isOpen
      options={OPTIONS_COLLECTION}
      isOpeningUpward={false}
      noResults={false}
    />
  ));

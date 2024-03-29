export const colors = {
  white: '#FFFFFF',
  gray5: '#F8F9FA',
  gray10: '#F1F3F5',
  gray20: '#E9ECEF',
  gray30: '#DEE2E6',
  gray40: '#CED4DA',
  gray50: '#ADB5BD',
  gray60: '#868E96',
  gray70: '#495057',
  gray80: '#343A40',
  gray90: '#212529',
  gray100: '#EBEFF9',
  purple90: '#140087',
  purple80: '#4127D1',
  purple70: '#6244FF',
  purple60: '#836BFF',
  purple40: '#C2B6FF',
  purple20: '#E8E4FF',
  purple10: '#F1EFFF',
  red10: '#FFEFF2',
  red20: '#FFE2E7',
  red40: '#FFC4CF',
  red50: '#F35D78',
  red70: '#FC4162',
  red100: '#F13F5F',
  blue20: '#DFF0FF',
  blue70: '#2892F4',
  orange70: '#FF8E6A',
  green10: '#EFFFFB',
  green40: '#A5DED4',
  green70: '#0FB093',
  yellow70: '#F9B127',
  brand100: '#F5F1FF',
  brand500: '#6A36FF',
  whiteLoadingDimmed: '#ffffff99',
  grayLoadingDimmed: '#ffffff99',
} as const;

export type ColorTheme = typeof colors;

// Type definitions for react-contribution-calendar 1.0.3
// Project: https://github.com/seiwon-yaehee/react-contribution-calendar
// Definitions by: Seiwon Park <https://github.com/SeiwonPark>
//                 Yaehee Choe <https://github.com/YaeheeChoe>

/// <reference path="./types.d.ts" />

declare module 'react-contribution-calendar' {
  import { FunctionComponent } from 'react'
  /**
   * Returns an object of ThemeProps which could be used as theme attribute of
   * ContributionCalendarProps.
   * @param {ThemeProps} themeProps - Theme color properties from level 0 to 4.
   */
  export const createTheme = (themeProps: ThemeProps): ThemeProps => {}

  /**
   * This is for attributes of <ContributionCalendar /> function component.
   */
  export interface ContributionCalendarProps {
    /**
     * List of items in the data, defaults to an empty list `[]`.
     */
    data?: InputData[]
    /**
     * The text color of calendar indexes for months and dates.
     */
    textColor?: string
    /**
     * The name of theme for the ContributionCalendar, defaults to `grass`. Also
     * `ThemeProps` could be added directly i.e. when trying to use custom theme.
     */
    theme?: string | ThemeProps
  }

  export const ContributionCalendar: FunctionComponent<ContributionCalendarProps>
}
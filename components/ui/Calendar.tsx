"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
    Calendar as AriaCalendar,
    CalendarGrid as AriaCalendarGrid,
    CalendarGridBody as AriaCalendarGridBody,
    CalendarGridHeader as AriaCalendarGridHeader,
    CalendarHeaderCell as AriaCalendarHeaderCell,
    Heading,
    CalendarCell as AriaCalendarCell,
} from "react-aria-components";
import type { CalendarProps as AriaCalendarProps, DateValue } from "react-aria-components";
import { Button } from "./Button";
import { cx } from "@/lib/utils";

interface CalendarProps extends AriaCalendarProps<DateValue> {
    highlightedDates?: DateValue[];
}

export const CalendarCell = ({ date }: { date: DateValue }) => {
    return (
        <AriaCalendarCell
            date={date as any}
            className={({ isSelected, isToday, isOutsideMonth, isDisabled }) =>
                cx(
                    "flex size-10 items-center justify-center rounded-full text-sm font-medium cursor-pointer transition-colors outline-hidden",
                    isToday && "text-brand-secondary font-bold",
                    isSelected ? "bg-brand-solid text-white" : "text-secondary hover:bg-secondary",
                    isOutsideMonth && "text-quaternary",
                    isDisabled && "text-quaternary cursor-not-allowed"
                )
            }
        />
    );
};

export const Calendar = ({ highlightedDates: _highlightedDates, ...props }: CalendarProps) => {
    return (
        <AriaCalendar {...props} className={cx("w-full", props.className)}>
            <header className="flex items-center justify-between pb-4">
                <Button slot="previous" variant="secondary" size="sm" className="size-8 p-0 flex items-center justify-center">
                    <ChevronLeft className="size-4" />
                </Button>
                <Heading className="text-sm font-semibold text-fg-secondary uppercase tracking-wider" />
                <Button slot="next" variant="secondary" size="sm" className="size-8 p-0 flex items-center justify-center">
                    <ChevronRight className="size-4" />
                </Button>
            </header>
            <AriaCalendarGrid weekdayStyle="short">
                <AriaCalendarGridHeader>
                    {(day) => (
                        <AriaCalendarHeaderCell className="border-b-4 border-transparent p-0">
                            <div className="flex size-10 items-center justify-center text-xs font-semibold text-tertiary uppercase">{day.slice(0, 2)}</div>
                        </AriaCalendarHeaderCell>
                    )}
                </AriaCalendarGridHeader>
                <AriaCalendarGridBody className="[&_td]:p-0">
                    {(date) => <CalendarCell date={date} />}
                </AriaCalendarGridBody>
            </AriaCalendarGrid>
        </AriaCalendar>
    );
};

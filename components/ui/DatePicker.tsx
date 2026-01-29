"use client";

import { getLocalTimeZone, today } from "@internationalized/date";
import { Calendar as CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDateFormatter } from "react-aria";
import type { DatePickerProps as AriaDatePickerProps, DateValue } from "react-aria-components";
import {
    DatePicker as AriaDatePicker,
    Dialog as AriaDialog,
    Group as AriaGroup,
    Popover as AriaPopover,
    Label as AriaLabel,
    Text as AriaText
} from "react-aria-components";
import { Button } from "./Button";
import { cx } from "@/lib/utils";
import { Calendar } from "./Calendar";

interface DatePickerProps extends AriaDatePickerProps<DateValue> {
    label?: string;
    description?: string;
    errorMessage?: string;
    placeholder?: string;
    onApply?: () => void;
    onCancel?: () => void;
}

export const DatePicker = ({
    label,
    description,
    errorMessage,
    placeholder = "Select date",
    onApply,
    onCancel,
    ...props
}: DatePickerProps) => {
    const formatter = useDateFormatter({ month: "short", day: "numeric", year: "numeric" });
    const localToday = today(getLocalTimeZone());
    const [selectedValue, setSelectedValue] = useState<DateValue | null>(props.value || props.defaultValue || null);

    // Sync with props if provided
    useEffect(() => {
        if (props.value !== undefined) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedValue(props.value);
        }
    }, [props.value]);

    return (
        <AriaDatePicker
            {...props}
            value={props.value || selectedValue || undefined}
            onChange={(val) => {
                setSelectedValue(val);
                props.onChange?.(val);
            }}
            className={cx("flex flex-col gap-1.5", props.className)}
        >
            {label && <AriaLabel className="text-sm font-medium text-secondary">{label}</AriaLabel>}
            <AriaGroup className="relative">
                <Button
                    variant="secondary"
                    className="w-full justify-between font-normal"
                    iconLeading={CalendarIcon}
                >
                    <span className={cx(!(props.value || selectedValue) && "text-placeholder_subtle")}>
                        {(props.value || selectedValue) ? formatter.format((props.value || selectedValue)!.toDate(getLocalTimeZone())) : placeholder}
                    </span>
                </Button>
            </AriaGroup>
            {description && <AriaText slot="description" className="text-sm text-tertiary">{description}</AriaText>}
            {errorMessage && <AriaText slot="errorMessage" className="text-sm text-error-600">{errorMessage}</AriaText>}

            <AriaPopover
                offset={8}
                placement="bottom start"
                className={(state) => cx(
                    "z-50 overflow-auto rounded-xl bg-primary shadow-xl ring-1 ring-secondary_alt transition-all outline-hidden",
                    state.isEntering && "animate-in fade-in zoom-in-95 duration-100 ease-out",
                    state.isExiting && "animate-out fade-out zoom-out-95 duration-75 ease-in"
                )}
            >
                <AriaDialog className="outline-hidden">
                    {({ close }) => (
                        <div className="flex flex-col">
                            <div className="px-5 py-4">
                                <Calendar highlightedDates={[localToday]} />
                            </div>
                            <div className="grid grid-cols-2 gap-3 border-t border-secondary p-4 bg-secondary_subtle">
                                <Button
                                    variant="secondary"
                                    size="md"
                                    onPress={() => { onCancel?.(); close(); }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    size="md"
                                    onPress={() => { onApply?.(); close(); }}
                                >
                                    Apply
                                </Button>
                            </div>
                        </div>
                    )}
                </AriaDialog>
            </AriaPopover>
        </AriaDatePicker>
    );
};

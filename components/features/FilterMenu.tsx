"use client";

import { useState } from "react";
// import { FilterLines } from "@untitledui/icons";
import { Filter as FilterLines } from "lucide-react";
import { SlideoutMenu } from "@/components/layout/SlideoutMenu";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

export const FilterMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <SlideoutMenu.Trigger isOpen={isOpen} onOpenChange={setIsOpen}>
            <Button variant="secondary" iconLeading={FilterLines}>
                Filters
            </Button>
            <SlideoutMenu.Overlay>
                <SlideoutMenu.Modal>
                    <SlideoutMenu.Dialog>
                        <SlideoutMenu.Header onClose={() => setIsOpen(false)}>
                            <SlideoutMenu.Title>Filters</SlideoutMenu.Title>
                            <SlideoutMenu.Description>
                                Narrow down your search results.
                            </SlideoutMenu.Description>
                        </SlideoutMenu.Header>
                        <SlideoutMenu.Content className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <Label>Status</Label>
                                <div className="flex flex-col gap-2">
                                    <Checkbox label="Active" value="active" />
                                    <Checkbox label="Pending" value="pending" />
                                    <Checkbox label="Archived" value="archived" />
                                </div>
                            </div>

                            <Select label="Category" placeholder="Select category">
                                <Select.Item id="all">All Categories</Select.Item>
                                <Select.Item id="design">Design</Select.Item>
                                <Select.Item id="engineering">Engineering</Select.Item>
                                <Select.Item id="marketing">Marketing</Select.Item>
                            </Select>

                            <Input label="Keywords" placeholder="Search keywords..." />
                        </SlideoutMenu.Content>
                        <SlideoutMenu.Footer>
                            <Button variant="secondary" className="w-full" onPress={() => setIsOpen(false)}>
                                Clear all
                            </Button>
                            <Button className="w-full" onPress={() => setIsOpen(false)}>
                                Apply filters
                            </Button>
                        </SlideoutMenu.Footer>
                    </SlideoutMenu.Dialog>
                </SlideoutMenu.Modal>
            </SlideoutMenu.Overlay>
        </SlideoutMenu.Trigger>
    );
};

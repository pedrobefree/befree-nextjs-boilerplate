"use client";

import { LogOut, Settings, User } from "lucide-react";
import { Avatar } from "../ui/Avatar";
import { Dropdown } from "../ui/Dropdown";

interface UserMenuProps {
    name: string;
    email: string;
    avatarUrl: string;
}

export const UserMenu = ({ name, email, avatarUrl }: UserMenuProps) => {
    return (
        <Dropdown.Root>
            <button className="group flex items-center gap-3 rounded-lg p-2 outline-none hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-brand-600">
                <Avatar src={avatarUrl} alt={name} size="md" status="online" />
                <div className="flex flex-col items-start text-sm">
                    <span className="font-semibold text-gray-700">{name}</span>
                    <span className="text-gray-500">{email}</span>
                </div>
            </button>
            <Dropdown.Popover placement="bottom end" className="w-56">
                <Dropdown.Menu>
                    <Dropdown.Section>
                        <Dropdown.Item icon={User} label="View profile" />
                        <Dropdown.Item icon={Settings} label="Settings" />
                    </Dropdown.Section>
                    <Dropdown.Separator />
                    <Dropdown.Section>
                        <Dropdown.Item icon={LogOut} label="Log out" />
                    </Dropdown.Section>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown.Root>
    );
};

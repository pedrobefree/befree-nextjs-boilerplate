"use client";

import { useState } from "react";
import { List, LayoutGrid, Plus, Search, MoreHorizontal, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";
import { cx } from "@/lib/utils";
import { TaskModal } from "./TaskModal";
import { CreateTaskModal } from "./CreateTaskModal";

interface Task {
    id: string;
    title: string;
    status: "todo" | "in-progress" | "done";
    priority: "low" | "medium" | "high";
    dueDate: string;
    assignee: string;
    description?: string;
    notes?: string;
}

const initialTasks: Task[] = [
    { id: "1", title: "Finalize UI Kit tokens", status: "in-progress", priority: "high", dueDate: "Feb 10", assignee: "https://images.unsplash.com/photo-1494790108377-be9c29b29330", notes: "Check contrast ratios for all primary colors." },
    { id: "2", title: "Review documentation with stakeholders", status: "todo", priority: "medium", dueDate: "Feb 12", assignee: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5" },
    { id: "3", title: "Fix responsive alignment bugs", status: "todo", priority: "low", dueDate: "Feb 15", assignee: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d" },
    { id: "4", title: "Implement API authentication", status: "done", priority: "high", dueDate: "Jan 25", assignee: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" },
    { id: "5", title: "Design system audit", status: "in-progress", priority: "medium", dueDate: "Feb 20", assignee: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80" },
];

export const ProjectTasks = () => {
    const [view, setView] = useState<"list" | "kanban">("kanban");
    const [search, setSearch] = useState("");
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [createModalInitialStatus, setCreateModalInitialStatus] = useState<Task["status"]>("todo");

    const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

    const handleDragStart = (e: React.DragEvent, taskId: string) => {
        e.dataTransfer.setData("taskId", taskId);
    };

    const handleDrop = (e: React.DragEvent, status: Task["status"]) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("taskId");
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status } : t));
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                    <button
                        onClick={() => setView("kanban")}
                        className={cx("p-1.5 rounded-md transition", view === "kanban" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-900")}
                    >
                        <LayoutGrid className="size-4" />
                    </button>
                    <button
                        onClick={() => setView("list")}
                        className={cx("p-1.5 rounded-md transition", view === "list" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-900")}
                    >
                        <List className="size-4" />
                    </button>
                </div>
                <div className="flex items-center gap-3">
                    <Input
                        placeholder="Search tasks..."
                        leftIcon={<Search className="size-4" />}
                        className="h-9"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button
                        size="sm"
                        className="gap-2 focus:ring-2 focus:ring-brand-500"
                        onClick={() => {
                            setCreateModalInitialStatus("todo");
                            setIsCreateModalOpen(true);
                        }}
                    >
                        <Plus className="size-4" /> Add Task
                    </Button>
                </div>
            </div>

            {view === "kanban" ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <KanbanColumn
                        title="Todo"
                        status="todo"
                        tasks={filteredTasks.filter(t => t.status === "todo")}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragStart={handleDragStart}
                        onTaskClick={setSelectedTask}
                        onAddTask={() => {
                            setCreateModalInitialStatus("todo");
                            setIsCreateModalOpen(true);
                        }}
                    />
                    <KanbanColumn
                        title="In Progress"
                        status="in-progress"
                        tasks={filteredTasks.filter(t => t.status === "in-progress")}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragStart={handleDragStart}
                        onTaskClick={setSelectedTask}
                        onAddTask={() => {
                            setCreateModalInitialStatus("in-progress");
                            setIsCreateModalOpen(true);
                        }}
                    />
                    <KanbanColumn
                        title="Done"
                        status="done"
                        tasks={filteredTasks.filter(t => t.status === "done")}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragStart={handleDragStart}
                        onTaskClick={setSelectedTask}
                        onAddTask={() => {
                            setCreateModalInitialStatus("done");
                            setIsCreateModalOpen(true);
                        }}
                    />
                </div>
            ) : (
                <Card>
                    <CardContent className="p-0">
                        <div className="divide-y divide-gray-100">
                            {filteredTasks.map(task => (
                                <TaskListItem
                                    key={task.id}
                                    task={task}
                                    onClick={() => setSelectedTask(task)}
                                />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            <TaskModal
                task={selectedTask}
                isOpen={!!selectedTask}
                onClose={() => setSelectedTask(null)}
            />

            <CreateTaskModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                initialStatus={createModalInitialStatus}
            />
        </div>
    );
};

interface ColumnProps {
    title: string;
    status: Task["status"];
    tasks: Task[];
    onDrop: (e: React.DragEvent, status: Task["status"]) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDragStart: (e: React.DragEvent, taskId: string) => void;
    onTaskClick: (task: Task) => void;
    onAddTask: () => void;
}

const KanbanColumn = ({ title, status, tasks, onDrop, onDragOver, onDragStart, onTaskClick, onAddTask }: ColumnProps) => (
    <div
        className="space-y-4"
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, status)}
    >
        <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                {title}
                <Badge variant="default" size="sm" className="bg-gray-100 text-gray-600 border-none font-bold">
                    {tasks.length}
                </Badge>
            </h3>
            <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="size-4" />
            </button>
        </div>
        <div className="space-y-3 min-h-[500px] p-2 bg-gray-50/50 rounded-xl border border-dashed border-gray-200 transition-colors hover:border-gray-300">
            {tasks.map(task => (
                <KanbanCard
                    key={task.id}
                    task={task}
                    onDragStart={onDragStart}
                    onClick={() => onTaskClick(task)}
                />
            ))}
            <button
                onClick={onAddTask}
                className="w-full py-2 flex items-center justify-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors"
            >
                <Plus className="size-3" /> Add task
            </button>
        </div>
    </div>
);

const KanbanCard = ({ task, onDragStart, onClick }: { task: Task, onDragStart: (e: React.DragEvent, id: string) => void, onClick: () => void }) => (
    <Card
        draggable
        onDragStart={(e) => onDragStart(e, task.id)}
        onClick={onClick}
        className="hover:border-brand-300 transition-all cursor-grab active:cursor-grabbing shadow-xs hover:shadow-md"
    >
        <CardContent className="p-4 space-y-4">
            <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-medium text-gray-900 leading-snug">{task.title}</span>
                <Badge
                    variant={task.priority === "high" ? "error" : task.priority === "medium" ? "warning" : "default"}
                    size="sm"
                    className="capitalize shrink-0"
                >
                    {task.priority}
                </Badge>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="size-3" />
                    <span>{task.dueDate}</span>
                </div>
                <Avatar src={task.assignee} size="xs" />
            </div>
        </CardContent>
    </Card>
);

const TaskListItem = ({ task, onClick }: { task: Task, onClick: () => void }) => (
    <div
        onClick={onClick}
        className="p-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors cursor-pointer group"
    >
        <div className="flex items-center gap-4 min-w-0">
            <div className={cx(
                "size-5 rounded-full border flex items-center justify-center shrink-0 transition-colors",
                task.status === "done" ? "bg-success-600 border-success-600 text-white" : "border-gray-200 bg-white group-hover:border-brand-600"
            )}>
                {task.status === "done" && <Plus className="size-3 rotate-45" />}
            </div>
            <div className="min-w-0">
                <p className={cx("text-sm font-medium truncate", task.status === "done" ? "text-gray-400 line-through" : "text-gray-900")}>
                    {task.title}
                </p>
                <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="size-3" /> {task.dueDate}
                    </span>
                    <Badge variant="default" size="sm" className="bg-gray-50 text-gray-600 uppercase text-[10px] tracking-wider font-bold">
                        {task.priority}
                    </Badge>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-3">
            <Avatar src={task.assignee} size="sm" />
            <button className="p-1 px-2 text-gray-400 hover:text-gray-600 transition-colors">
                <MoreHorizontal className="size-4" />
            </button>
        </div>
    </div>
);

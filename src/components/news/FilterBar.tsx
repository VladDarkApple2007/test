
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface FilterBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedSource: string;
    onSourceChange: (source: string) => void;
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    sources: string[];
    categories: string[];
}

export function FilterBar({
    searchQuery,
    onSearchChange,
    selectedSource,
    onSourceChange,
    selectedCategory,
    onCategoryChange,
    sources,
    categories,
}: FilterBarProps) {
    
    const handleReset = () => {
        onSearchChange("");
        onSourceChange("all");
        onCategoryChange("all");
    };

    const hasActiveFilters = searchQuery || selectedSource !== "all" || selectedCategory !== "all";

    return (
        <div className="space-y-6 rounded-xl border bg-card p-6 shadow-sm sticky top-24 transition-all duration-200">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold tracking-tight text-lg flex items-center gap-2">
                    <Filter className="h-4 w-4" /> Filters
                </h3>
                {hasActiveFilters && (
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleReset}
                        className="h-8 text-muted-foreground hover:text-foreground"
                    >
                        <X className="mr-1 h-3 w-3" /> Reset
                    </Button>
                )}
            </div>
            
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Search
                    </label>
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search articles..."
                            className="pl-9 bg-background/50"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Source</label>
                    <Select value={selectedSource} onValueChange={onSourceChange}>
                        <SelectTrigger className="bg-background/50">
                            <SelectValue placeholder="All Sources" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Sources</SelectItem>
                            <Separator className="my-1" />
                            {sources.map((source) => (
                                <SelectItem key={source} value={source}>
                                    {source}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {categories.length > 0 && (
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Category</label>
                        <Select value={selectedCategory} onValueChange={onCategoryChange}>
                            <SelectTrigger className="bg-background/50">
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                <Separator className="my-1" />
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>

            {hasActiveFilters && (
                 <div className="pt-2 flex flex-wrap gap-2">
                    {searchQuery && (
                        <Badge variant="secondary" className="px-2 py-1 text-xs cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors" onClick={() => onSearchChange("")}>
                            Search: {searchQuery} <X className="ml-1 h-3 w-3" />
                        </Badge>
                    )}
                    {selectedSource !== "all" && (
                         <Badge variant="secondary" className="px-2 py-1 text-xs cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors" onClick={() => onSourceChange("all")}>
                            Source: {selectedSource} <X className="ml-1 h-3 w-3" />
                         </Badge>
                    )}
                    {selectedCategory !== "all" && (
                        <Badge variant="secondary" className="px-2 py-1 text-xs cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors" onClick={() => onCategoryChange("all")}>
                            Category: {selectedCategory} <X className="ml-1 h-3 w-3" />
                        </Badge>
                    )}
                </div>
            )}
        </div>
    );
}

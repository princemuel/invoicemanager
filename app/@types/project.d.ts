type SidebarState = "default" | "compact";
type Result<T, E = string> = { data: T; error: null } | { data: null; error: E };

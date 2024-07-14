import { LargeMenuModuleContentTypes, MenuModuleContentTypes } from "@/app/shared/types/modules.types";

export function isMenuOptionDouble(module_set: any): module_set is { primary: MenuModuleContentTypes, secondary: MenuModuleContentTypes } {
    return module_set && module_set.primary !== undefined && module_set.secondary !== undefined;
}

export function isMenuOptionSingle(module_set: any): module_set is { large: LargeMenuModuleContentTypes } {
    return module_set && module_set.large !== undefined;
}
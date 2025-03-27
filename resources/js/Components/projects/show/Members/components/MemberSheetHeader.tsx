import { SheetHeader, SheetTitle } from '@/Components/ui/sheet';

type MemberSheetHeaderProps = {
    username: string;
};

export function MemberSheetHeader({ username }: MemberSheetHeaderProps) {
    return (
        <SheetHeader>
            <SheetTitle className="font-normal">
                Manage <span className="font-bold">{username}</span>
            </SheetTitle>
        </SheetHeader>
    );
}

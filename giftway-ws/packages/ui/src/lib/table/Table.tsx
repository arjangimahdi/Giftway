import type {
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

export const tableVariants = tv({
  slots: {
    root: 'w-full border-collapse font-sans text-sm text-foreground',
    head: '',
    body: '',
    row: 'border-b border-border',
    headerCell:
      'px-2 py-2 text-left text-xs font-medium tracking-wider text-muted uppercase',
    cell: 'px-2 py-2',
  },
  variants: {
    hoverable: {
      true: { body: '[&>tr]:transition-colors [&>tr]:hover:bg-foreground/4' },
    },
  },
});

const styles = tableVariants();

export type TableProps = TableHTMLAttributes<HTMLTableElement> &
  VariantProps<typeof tableVariants>;

export function Table({ hoverable, className, ...props }: TableProps) {
  return (
    <table
      className={tableVariants({ hoverable }).root({ className })}
      {...props}
    />
  );
}

export type TableSectionProps = HTMLAttributes<HTMLTableSectionElement> &
  VariantProps<typeof tableVariants>;

export function TableHead({ className, ...props }: TableSectionProps) {
  return <thead className={styles.head({ className })} {...props} />;
}

export function TableBody({
  hoverable = true,
  className,
  ...props
}: TableSectionProps) {
  return (
    <tbody
      className={tableVariants({ hoverable }).body({ className })}
      {...props}
    />
  );
}

export function TableRow({
  className,
  ...props
}: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={styles.row({ className })} {...props} />;
}

export function TableHeaderCell({
  className,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={styles.headerCell({ className })} {...props} />;
}

export function TableCell({
  className,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={styles.cell({ className })} {...props} />;
}

export default Table;

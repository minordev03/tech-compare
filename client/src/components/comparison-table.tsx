import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Comparison } from "@shared/schema";

interface ComparisonTableProps {
  comparison: Comparison;
}

export default function ComparisonTable({ comparison }: ComparisonTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
      <div className="bg-primary text-white px-6 py-4">
        <h3 className="text-xl font-semibold">Detailed Specifications</h3>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[var(--neutral-50)]">
              <TableHead className="text-left p-4 font-semibold text-[var(--neutral-900)]">
                Feature
              </TableHead>
              {comparison.items.map((item) => (
                <TableHead key={item.name} className="text-center p-4 font-semibold text-[var(--neutral-900)]">
                  {item.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparison.comparisonTable.map((row, index) => (
              <TableRow key={row.feature} className={index % 2 === 0 ? "" : "bg-[var(--neutral-50)]"}>
                <TableCell className="p-4 font-medium">
                  {row.feature}
                </TableCell>
                {comparison.items.map((item) => (
                  <TableCell key={item.name} className="p-4 text-center">
                    {row.values[item.name] || "—"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

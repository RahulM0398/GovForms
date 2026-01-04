import { Plus, Trash2, Users2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDashboard } from '@/context/DashboardContext';
import type { EmployeeByDiscipline } from '@/types';

const FUNCTION_CODES = [
  { code: '01', discipline: 'Acoustical Engineer' },
  { code: '02', discipline: 'Administrative' },
  { code: '12', discipline: 'Architect' },
  { code: '21', discipline: 'Civil Engineer' },
  { code: '23', discipline: 'Structural Engineer' },
  { code: '24', discipline: 'Electrical Engineer' },
  { code: '30', discipline: 'Mechanical Engineer' },
  { code: '32', discipline: 'Environmental Engineer' },
  { code: '42', discipline: 'Interior Designer' },
  { code: '48', discipline: 'Landscape Architect' },
  { code: '60', discipline: 'Project Manager' },
];

export function EmployeesByDiscipline() {
  const {
    state,
    addEmployeeByDiscipline,
    removeEmployeeByDiscipline,
    updateEmployeeByDiscipline,
  } = useDashboard();

  const employees = state.formData.sf330PartII.employeesByDiscipline;

  const handleAddRow = () => {
    const newEmployee: EmployeeByDiscipline = {
      id: crypto.randomUUID(),
      functionCode: '',
      discipline: '',
      employeeCount: 0,
    };
    addEmployeeByDiscipline(newEmployee);
  };

  const handleUpdateRow = (
    id: string,
    field: keyof EmployeeByDiscipline,
    value: string | number
  ) => {
    const employee = employees.find((e) => e.id === id);
    if (employee) {
      if (field === 'functionCode') {
        const match = FUNCTION_CODES.find((fc) => fc.code === value);
        updateEmployeeByDiscipline({
          ...employee,
          functionCode: value as string,
          discipline: match?.discipline || employee.discipline,
        });
      } else {
        updateEmployeeByDiscipline({
          ...employee,
          [field]: value,
        });
      }
    }
  };

  const totalEmployees = employees.reduce((sum, emp) => sum + emp.employeeCount, 0);

  return (
    <div className="bg-white rounded-xl border border-[var(--color-border)] shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)] bg-gradient-to-r from-pink-50 to-rose-50">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-100">
            <Users2 className="h-4 w-4 text-pink-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-foreground)]">Block 9 - Employees by Discipline</h3>
            <p className="text-xs text-[var(--color-muted-foreground)]">Personnel breakdown by function code</p>
          </div>
        </div>
        <Button size="sm" onClick={handleAddRow} className="bg-pink-600 hover:bg-pink-700 text-white shadow-sm">
          <Plus className="mr-1 h-4 w-4" />
          Add Row
        </Button>
      </div>
      <div className="p-5">
        {employees.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--color-border)] py-10">
            <Users2 className="h-10 w-10 text-[var(--color-muted-foreground)]/30" />
            <p className="mt-3 text-sm font-medium text-[var(--color-muted-foreground)]">No disciplines added</p>
            <Button variant="ghost" size="sm" className="mt-2 text-pink-600" onClick={handleAddRow}>
              <Plus className="mr-1 h-4 w-4" />
              Add first discipline
            </Button>
          </div>
        ) : (
          <>
            <div className="rounded-lg border border-[var(--color-border)] overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[var(--color-muted)] hover:bg-[var(--color-muted)]">
                    <TableHead className="w-[100px] text-xs font-semibold">Code</TableHead>
                    <TableHead className="text-xs font-semibold">Discipline</TableHead>
                    <TableHead className="w-[120px] text-right text-xs font-semibold">Count</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id} className="hover:bg-[var(--color-muted)]/50">
                      <TableCell>
                        <Input
                          value={employee.functionCode}
                          onChange={(e) => handleUpdateRow(employee.id, 'functionCode', e.target.value)}
                          placeholder="00"
                          className="h-8 w-full font-mono text-center bg-white border-[var(--color-border)]"
                          list={`function-codes-${employee.id}`}
                        />
                        <datalist id={`function-codes-${employee.id}`}>
                          {FUNCTION_CODES.map((fc) => (
                            <option key={fc.code} value={fc.code}>{fc.discipline}</option>
                          ))}
                        </datalist>
                      </TableCell>
                      <TableCell>
                        <Input
                          value={employee.discipline}
                          onChange={(e) => handleUpdateRow(employee.id, 'discipline', e.target.value)}
                          placeholder="Enter discipline"
                          className="h-8 bg-white border-[var(--color-border)]"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          value={employee.employeeCount || ''}
                          onChange={(e) => handleUpdateRow(employee.id, 'employeeCount', parseInt(e.target.value) || 0)}
                          placeholder="0"
                          className="h-8 text-right bg-white border-[var(--color-border)]"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-[var(--color-destructive)] hover:bg-[var(--color-destructive)]/10"
                          onClick={() => removeEmployeeByDiscipline(employee.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Summary footer */}
            <div className="mt-4 flex items-center justify-between rounded-lg bg-[var(--color-muted)] px-4 py-3">
              <span className="text-sm font-medium text-[var(--color-muted-foreground)]">
                {employees.length} discipline{employees.length !== 1 ? 's' : ''}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--color-muted-foreground)]">Total:</span>
                <span className="rounded-md bg-pink-100 px-2.5 py-1 text-sm font-bold text-pink-700">
                  {totalEmployees}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

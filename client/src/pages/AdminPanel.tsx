import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function AdminPanel() {
  const { toast } = useToast();
  const [editingBalance, setEditingBalance] = useState<{accountId: number, balance: string} | null>(null);

  const { data: usersData, isLoading: loadingUsers } = useQuery<{users: any[]}>({
    queryKey: ["/api/admin/users"],
  });

  const updateBalanceMutation = useMutation({
    mutationFn: async ({ accountId, balance }: { accountId: number, balance: string }) => {
      await apiRequest("PATCH", `/api/admin/accounts/${accountId}/balance`, { balance });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      setEditingBalance(null);
      toast({ title: "Success", description: "Balance updated successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update balance", variant: "destructive" });
    }
  });

  if (loadingUsers) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Management Panel</h1>
      
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>User Accounts Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Admin Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usersData?.users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>{user.firstName} {user.lastName}</TableCell>
                    <TableCell>{user.isAdmin ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      <UserAccountsView userId={user.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function UserAccountsView({ userId }: { userId: number }) {
  const { data: accountsData, isLoading } = useQuery<{accounts: any[]}>({
    queryKey: [`/api/admin/users/${userId}/accounts`],
  });

  const [editValue, setEditValue] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const { toast } = useToast();

  const updateBalanceMutation = useMutation({
    mutationFn: async ({ accountId, balance }: { accountId: number, balance: string }) => {
      await apiRequest("PATCH", `/api/admin/accounts/${accountId}/balance`, { balance });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/admin/users/${userId}/accounts`] });
      setEditingId(null);
      toast({ title: "Success", description: "Balance updated" });
    }
  });

  if (isLoading) return <span>Loading accounts...</span>;

  return (
    <div className="space-y-2">
      {accountsData?.accounts.map(account => (
        <div key={account.id} className="flex items-center gap-2 text-sm border-b pb-1">
          <span className="w-32">{account.accountType}:</span>
          {editingId === account.id ? (
            <>
              <Input 
                value={editValue} 
                onChange={(e) => setEditValue(e.target.value)}
                className="h-8 w-24"
              />
              <Button size="sm" onClick={() => updateBalanceMutation.mutate({ accountId: account.id, balance: editValue })}>Save</Button>
              <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
            </>
          ) : (
            <>
              <span className="font-mono w-24">${account.balance}</span>
              <Button size="sm" variant="ghost" onClick={() => {
                setEditingId(account.id);
                setEditValue(account.balance);
              }}>Edit</Button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

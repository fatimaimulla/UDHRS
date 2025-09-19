"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Users, Plus, Trash2 } from "lucide-react"

interface Group {
  id: string
  name: string
  members: string[]
}

export function GroupsSection() {
  const [groups, setGroups] = useState<Group[]>([])
  const [open, setOpen] = useState(false)
  const [groupName, setGroupName] = useState("")

  const handleCreateGroup = () => {
    if (!groupName.trim()) return
    const newGroup: Group = {
      id: Date.now().toString(),
      name: groupName,
      members: [],
    }
    setGroups((prev) => [...prev, newGroup])
    setGroupName("")
    setOpen(false)
  }

  const handleDeleteGroup = (id: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Groups</h2>
        <Button onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Create Group
        </Button>
      </div>

      {/* Groups list */}
      {groups.length === 0 ? (
        <Card>
          <CardContent className="text-center py-6 text-muted-foreground">
            No groups created yet
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {groups.map((group) => (
            <Card key={group.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{group.name}</CardTitle>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteGroup(group.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {group.members.length} members
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Group Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Group</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateGroup}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function OrderPage() {
  const [order, setOrder] = useState([]);
  const [notes, setNotes] = useState("");
  const [dineOption, setDineOption] = useState("Dine-in");
  const [vegetableUpgrade, setVegetableUpgrade] = useState({});

  const menu = [
    { id: 1, name: "Popcorn Chicken Bento", price: 24.9 },
    { id: 2, name: "Cheese Pork Cutlet Bento", price: 24.9 },
    { id: 3, name: "Fried Pork Cutlet Bento", price: 24.9 },
    { id: 15, name: "Beef with Scallion", price: 28 },
    { id: 16, name: "Salt & Scallion Beef", price: 28 },
    { id: 17, name: "Black Pepper Beef", price: 28 },
    { id: 28, name: "Black Pepper Chicken", price: 23 },
    { id: 32, name: "Three-Cup Chicken", price: 23 },
    { id: 47, name: "Laksa Noodle Soup", price: 24.9 },
    { id: 13, name: "Mapo Tofu (Mild)", price: 22 },
    { id: 14, name: "Stir-Fried Vegetables", price: 18 },
  ];

  const toggleItem = (item) => {
    setOrder((prev) => {
      const exists = prev.find((x) => x.id === item.id);
      if (exists) return prev.filter((x) => x.id !== item.id);
      return [...prev, item];
    });
  };

  const handleVegetableUpgrade = (id) => {
    setVegetableUpgrade((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const total = order.reduce((sum, item) => {
    const upgraded = vegetableUpgrade[item.id] ? 2.5 : 0;
    return sum + item.price + upgraded;
  }, 0);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📋 Order Online · MEET·U CAFE</h1>

      <Tabs defaultValue="menu" className="mb-4">
        <TabsList>
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="order">Your Order</TabsTrigger>
        </TabsList>

        <TabsContent value="menu">
          <div className="grid gap-4">
            {menu.map((item) => {
              const isMainDish =
                (item.name.includes("Beef") ||
                  item.name.includes("Chicken") ||
                  item.name.includes("Pork")) &&
                !item.name.includes("Bento");

              return (
                <Card key={item.id} className="p-2">
                  <CardContent className="flex flex-col gap-1">
                    <div className="flex justify-between">
                      <span>{item.name}</span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                    {isMainDish ? (
                      <div className="text-sm text-gray-600">
                        <Checkbox
                          checked={vegetableUpgrade[item.id] || false}
                          onCheckedChange={() => handleVegetableUpgrade(item.id)}
                        />
                        <span className="ml-2">+ $2.5 Vegetable Upgrade</span>
                      </div>
                    ) : null}
                    <Button onClick={() => toggleItem(item)} className="mt-2" size="sm">
                      {order.find((x) => x.id === item.id) ? "Remove" : "Add to Order"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="order">
          <div className="space-y-4">
            <div>
              <label className="font-medium">Dine Option:</label>
              <select
                className="ml-2 border rounded px-2 py-1"
                value={dineOption}
                onChange={(e) => setDineOption(e.target.value)}
              >
                <option>Dine-in</option>
                <option>Takeaway</option>
                <option>Pickup</option>
              </select>
            </div>
            <div>
              <label className="font-medium">Notes:</label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g., No onion, extra chili..."
              />
            </div>
            <div>
              <h2 className="font-bold">Items:</h2>
              {order.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name}
                    {vegetableUpgrade[item.id] && " (+Veg)"}
                  </span>
                  <span>
                    ${(
                      item.price + (vegetableUpgrade[item.id] ? 2.5 : 0)
                    ).toFixed(2)}
                  </span>
                </div>
              ))}
              <hr className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full">Submit Order</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

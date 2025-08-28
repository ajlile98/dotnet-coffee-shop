# Coffee Shop App – MVP Feature List

## 1. User Management
- **User Registration**
  - Create account with name, email, password.
  - Optional: phone number.
- **Authentication & Authorization**
  - Login/logout functionality.
  - Role-based access (`Customer` vs `Employee`).

---

## 2. Menu Management
- **View Menu**
  - Item name, description, price, image (optional in MVP).
  - Categories (Coffee, Tea, Snacks).
- *(Optional Employee/Admin Feature)*: CRUD to add/update/remove menu items.

---

## 3. Ordering
- **Place Order**
  - Select item(s) and quantity.
  - Auto-calculate total price.
  - Optional: choose pickup time.
- **Order Confirmation**
  - Display confirmation page or order number.

---

## 4. Employee Order Queue
- **Order Queue View** (Employee only)
  - List of all active/unfulfilled orders with timestamp.
  - Show order details (items, quantities, special instructions).
- **Order Fulfillment**
  - Mark order as completed.
  - Removes from active queue.

---

## 5. Basic Status Tracking
- **Customer View**
  - Check order status: Pending / In Progress / Ready.

---

## 6. Minimal Admin / Config
- Assign employee roles.
- Basic menu setup (optional in MVP if hardcoded).

import { Router } from "express";
import getCompanyInfo from "../controller/info.js"
import { getAllProducts, AddMenuItem, UpdateMenuItem, DeleteMenuItem } from "../controller/menu.js";
import authenticateAdmin from "../middleware/authenticateAdmin.js";

const router = Router();

router.get("/menu", getAllProducts)

// localhost:8000/company
router.get("/", async (req, res) => {
  const info = await getCompanyInfo()
  res.json({ info: info[0].info })

});



//POST new menu item
router.post("/", authenticateAdmin, async (req, res) => {
  try{
    const newMenuItem = await AddMenuItem(req.body)

    res.json({message: "New menu item added successfully", newMenuItem})

  }catch(error){
    res.status(500).json({message: "Error adding new menu item", error: error.message})
  }
})

//PUT menu item

router.put("/:id", authenticateAdmin, async (req, res) =>{
  try{
    const updateItem = await UpdateMenuItem(req.params.id, req.body)
    res.json({message: "Menu item updated successfully", updateItem})
  }catch(error){
    res.status(404).json({message: "Error updating menu item", error: error.message})
  }
})

//DELETE menu item
router.delete("/:id", authenticateAdmin, async (req, res) =>{
  try{
    const deleteItem = await DeleteMenuItem(req.params.id)
    res.json({message: "Item deleted successfully", deleteItem})
  }catch(error){
    res.status(404).json({message: "Error deleting item", error: error.message})
  }
})

export default router;
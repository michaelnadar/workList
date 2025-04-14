// controllers/todoController.js
const { WorkList } = require('../models');

const getToDoListsByUserId = async (req, res) => {
  try {
 //   const userId = req.user.id; // From decoded JWT via middleware

    const toDoLists = await WorkList.findAll(
     {
     where: { UserID: req.user.id },
   }
  );

    if (!toDoLists || toDoLists.length === 0) {
      return res.status(200).json([]); // Return empty array like .NET version
    }

    return res.status(200).json(toDoLists);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const createWorkList = async (req, res) => {
  try {
    // Assuming you're using JWT middleware to attach user to req
    const userId = parseInt(req.user.id);

    const { Message, Priority, Category } = req.body;

    await WorkList.create({
      Message,
      UserID: userId,
      Priority,
      Category
    });

    const userWorkLists = await WorkList.findAll({
      where: { UserID: userId }
    });

    res.status(200).json(userWorkLists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating worklist item' });
  }
};

const updateWorkList = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from JWT in middleware
    const workListId = parseInt(req.params.id);
    const { Message, Priority, Category } = req.body;

    // Find the existing record
    const existing = await WorkList.findByPk(workListId);

    if (!existing) {
      return res.status(404).json({ message: 'ToDo item not found' });
    }

    if (existing.UserID !== userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    // Update the record
    existing.Message = Message;
    existing.Priority = Priority;
    existing.Category = Category;

    await existing.save();

    // Return all records for that user
    const allUserTodos = await WorkList.findAll({
      where: { UserID: userId },
    });

    res.status(200).json(allUserTodos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteSingleWorkList = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from JWT in middleware
    const workListId = parseInt(req.params.id);

    // Find the to-do item by ID and check if it belongs to the current user
    const toDoItem = await WorkList.findOne({
      where: { Id: workListId, UserID: userId },
    });

    if (!toDoItem) {
      return res.status(404).json({ message: 'ToDo item not found or not owned by user' });
    }

    // Remove the to-do item
    await toDoItem.destroy();

    // Return all remaining to-do items for the user
    const allUserTodos = await WorkList.findAll({
      where: { UserID: userId },
  });

    res.status(200).json(allUserTodos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



module.exports = { getToDoListsByUserId,createWorkList,updateWorkList,deleteSingleWorkList };

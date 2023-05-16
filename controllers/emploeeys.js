const {prisma} = require("../prisma/prisma-client");

/**
 *
 * @route GET /api/emploeeys
 * @desc Fetch all employees
 * @access Private
 */
const all = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();

    res.status(200).json(employees);

  } catch (e) {
    res.status(500).json({message: "Failed to obtain employees"});
  }
};

/**
 *
 * @route POST /api/emploeeys/add
 * @desc Add all employees
 * @access Private
 */
const add = async (req, res) => {
  const data = req.body;

  try {

    if (!data) {
      return res.status(400).json({ error: "Invalid request body" });
    }


    if (!data.firstName || !data.lastName || !data.address || !data.age) {
      return res.status(400).json({ data: "All fields are mandatory" });
    }

  const employee =  await prisma.employee.create({
    data: {
      ...data,
      userId: req.user.id,
    }
  });

    res.status(201).json(employee);

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "An error occurred while adding the employee" });
  }
}

/**
 *
 * @route POST api/employees/remove
 * @desc Удаление сотрудника
 * @access Private
 */
const remove = async (req, res) => {
  const { id } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ message: "Employee ID is required" });
    }

    await prisma.employee.delete({
      where: {
        id: id,
      },
    });

    res.status(204).json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete employee" });
  }
};

/**
 *
 * @route PUT api/employees/edit
 * @desc Редактирование сотрудника
 * @access Private
 */
const edit = async (req, res) => {
  const data = req.body;
  const id = data.id;

  try {
    if (!id) {
      return res.status(400).json({ message: "Employee ID is required" });
    }

    await prisma.employee.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });

    res.status(204).json({ message: "Employee edited successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to edit employee" });
  }
};

/**
 *
 * @route GET api/employees/:id
 * @desc Полчуние сотрудника
 * @access Private
 */
const employee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(employee);
  } catch {
    res.status(400).json({ message: "Неудалось получить сотрудника" });
  }
};


module.exports = {
  add,
  remove,
  edit,
  all,
  employee,
}
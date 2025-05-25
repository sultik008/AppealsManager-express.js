import { stat } from "fs";
import Appeal from "../models/model.js";

export async function addAppeal(req, res) {
  try {
    const newAppeal = new Appeal({
      title: req.body.title,
      status: "Новое",
      description: req.body.description,
      date: Date.now(),
    });

    await newAppeal.save();

    res.status(201).json({
      message: "Запрос успешно добавлен",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при добавлении запроса",
      error: error.message,
    });
  }
}
export async function getAllAppeals(req, res) {
  try {
    const appeals = await Appeal.find();
    res.status(200).json({
      message: "Запросы успешно получены",
      appeals: appeals,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при получении запросов",
      error: error.message,
    });
  }
}
export async function startAppeal(req, res) {
  try {
    const { id } = req.params;
    const appeal = await Appeal.findByIdAndUpdate(
      id,
      {
        status: "В работе",
        $unset: { reason: "", solve: "" },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Обращение взято",
      appeals: appeal,
    });
  } catch (error) {
    res.json({
      message: "Ошибка при получении запроса",
      error: error.message,
    });
  }
}
export async function completeAppeal(req, res) {
  try {
    const { id } = req.params;
    let solve = req.body.solve || "";

    if (solve.trim() === "") {
      return res.json({
        message: "Ошибка при завершении обращения",
        error: "solve не может быть пустым",
      });
    }

    const appeal = await Appeal.findByIdAndUpdate(
      id,
      {
        status: "Завершено",
        solve: solve.trim(),
        $unset: { reason: "" },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Обращение завершено",
      appeals: appeal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при завершени обращения",
      error: error.message,
    });
  }
}
export async function cancelAppeal(req, res) {
  try {
    const { id } = req.params;
    let reason = req.body.reason || "";

    if (reason.trim() === "") {
      return res.json({
        message: "Ошибка при отмене обращения",
        error: "reason не может быть пустым",
      });
    }
    const appeal = await Appeal.findByIdAndUpdate(
      id,
      {
        status: "отменено",
        reason: req.body.reason,
        $unset: { solve: "" },
      },
      { new: true }
    );
    res.status(200).json({
      message: "Обращение отменено",
      appeals: appeal,
    });
  } catch (error) {
    res.json({
      message: "Ошибка при отмене обращения",
      error: error.message,
    });
  }
}
export async function cancelinprogressAppeal(req, res) {
  try {
    let reason = req.body.reason || "";
    if (reason.trim() === "") {
      return res.json({
        message: "Ошибка при отмене обращении",
        error: "reason не может быть пустым",
      });
    }

    const filter = { status: "В работе" };
    const update = {
      $set: {
        status: "Отменено",
        reason: reason.trim(),
      },
    };

    const result = await Appeal.updateMany(filter, update);
    const canceledAppeals = await Appeal.find({
      status: "Отменено",
      reason: reason,
    });
    res.status(200).json({
      message: "Все обращения со статусом 'В работе' были отменены",
      result: result,
      appeals: canceledAppeals
    });
  } catch (error) {
    res.json({
      message: "Ошибка при отмене обращений",
      error: error.message,
    });
  }
}
export async function editAppeal(req, res) {
  try {
    const { id } = req.params;

    const { title, status, description } = req.body;
    const appeal = await Appeal.findOneAndUpdate(
      { _id: id },
      { title, status, description },
      { new: true }
    );
    res.status(200).json({
      message: "Запрос успешно обновлен",
      appeal: appeal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при обновлении запроса",
      error: error.message,
    });
  }
}
export async function deleteAppeal(req, res) {
  try {
    const { id } = req.params;
    const appeal = await Appeal.findByIdAndDelete(id);
    res.status(200).json({
      message: "Запрос успешно удален",
      appeal: appeal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при удалении запроса",
      error: error.message,
    });
  }
}

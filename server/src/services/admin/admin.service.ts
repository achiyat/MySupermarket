// server/src/services/admin/admin.service.ts
export const adminService = {
  create: async (Model: any, data: any) => {
    const _data = new Model(data);
    return await _data.save();
  },

  getAll: async (Model: any) => {
    return await Model.find().select("-password").exec();
  },

  getById: async (Model: any, id: string) => {
    return await Model.findById(id).select("-password").exec();
  },

  update: async (Model: any, id: string, data: any) => {
    return await Model.findByIdAndUpdate(id, data, { new: true })
      .select("-password")
      .exec();
  },
};

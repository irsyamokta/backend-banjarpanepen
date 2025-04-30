import prisma from "../config/db.js";

export const getPackages = async () => prisma.tourPackage.findMany();

export const getPackageById = async (id) => prisma.tourPackage.findUnique({ where: { id } });

export const createPackage = async (data, numericPrice, file) => {
    return prisma.tourPackage.create(
        {
            data: {
                title: data.title,
                price: numericPrice,
                benefit: data.benefit,
                thumbnail: file
            }
        });
};

export const updatePackage = async (id, data, numericPrice, file) => {
    return prisma.tourPackage.update({
        where: { id },
        data: {
            title: data.title,
            price: numericPrice,
            benefit: data.benefit,
            thumbnail: file
        }
    });
};

export const deletePackage = async (id) => prisma.tourPackage.delete({ where: { id } });
import { supabase } from "./supabaseClient";

export async function uploadImage(file: File) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `posts/${fileName}`;

    // Usa el nombre EXACTO del bucket (ver tu dashboard)
    const bucketName = "Customer"; // <-- cámbialo si es distinto

    // Subida
    const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);

    if (error) {
        console.error(error);
        throw new Error("Error al subir la imagen");
    }

    // Obtener URL pública
    const { data: publicURL } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

    return publicURL.publicUrl;
}
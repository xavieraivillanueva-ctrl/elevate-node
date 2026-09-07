import { useState } from 'react'
import { supabase } from '../lib/supabase'

export function useStorageUpload() {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadMedia = async (file: File, folder: 'banners' | 'avatars' = 'avatars') => {
    setUploading(true)
    setError(null)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`

      const { data, error: uploadError } = await supabase.storage
        .from('elevate-media')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) throw uploadError

      // Obtener URL pública
      const { data: publicData } = supabase.storage
        .from('elevate-media')
        .getPublicUrl(data.path)

      return publicData.publicUrl
    } catch (err: any) {
      setError(err.message)
      return null
    } finally {
      setUploading(false)
    }
  }

  return {
    uploadMedia,
    uploading,
    error,
  }
}

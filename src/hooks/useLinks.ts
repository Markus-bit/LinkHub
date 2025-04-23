import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Link, NewLink, UpdateLink } from '../types/database';
import toast from 'react-hot-toast';

export function useLinks() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchLinks();
    } else {
      setLinks([]);
      setLoading(false);
    }
  }, [user]);

  const fetchLinks = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('links')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setLinks(data || []);
    } catch (err) {
      console.error('Error fetching links:', err);
      setError('Failed to fetch links');
      toast.error('Failed to load your links');
    } finally {
      setLoading(false);
    }
  };

  const addLink = async (linkData: NewLink) => {
    if (!user) return;

    try {
      setError(null);
      const { id, ...newLinkData } = linkData;
      const newLink = { ...newLinkData, user_id: user.id };

      const { data, error } = await supabase
        .from('links')
        .insert([newLink])
        .select()
        .single();

      if (error) throw error;

      setLinks((prev) => [data, ...prev]);
      toast.success('Link added successfully');
      return data;
    } catch (err) {
      console.error('Error adding link:', err);
      setError('Failed to add link');
      toast.error('Failed to add link');
      throw err;
    }
  };

  const updateLink = async (linkData: UpdateLink) => {
    if (!user) return;

    try {
      setError(null);
      const updatedData = {
        ...linkData,
        user_id: user.id
      };

      const { data, error } = await supabase
        .from('links')
        .update(updatedData)
        .eq('id', linkData.id)
        .select()
        .single();

      if (error) throw error;

      setLinks((prev) =>
        prev.map((link) => (link.id === data.id ? data : link))
      );
      toast.success('Link updated successfully');
      return data;
    } catch (err) {
      console.error('Error updating link:', err);
      setError('Failed to update link');
      toast.error('Failed to update link');
      throw err;
    }
  };

  const deleteLink = async (id: string) => {
    if (!user) return;

    try {
      setError(null);
      const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setLinks((prev) => prev.filter((link) => link.id !== id));
      toast.success('Link deleted successfully');
    } catch (err) {
      console.error('Error deleting link:', err);
      setError('Failed to delete link');
      toast.error('Failed to delete link');
      throw err;
    }
  };

  const saveLink = async (linkData: NewLink) => {
    if (!linkData.id) {
      return addLink(linkData);
    }
    return updateLink(linkData as UpdateLink);
  };

  return {
    links,
    loading,
    error,
    fetchLinks,
    addLink,
    updateLink,
    deleteLink,
    saveLink,
  };
}
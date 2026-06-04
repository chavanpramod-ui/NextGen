import { supabase } from '@/lib/supabase';

export async function fetchCourses() {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching courses:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching courses:', error);
    return [];
  }
}

export async function fetchActivityData() {
  try {
    const { data, error } = await supabase
      .from('activity')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching activity:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching activity:', error);
    return [];
  }
}

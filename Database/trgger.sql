-- Cập nhật updated_at
CREATE OR REPLACE FUNCTION trg_users_update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_set_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION trg_users_update_timestamp();


-- Kiểm tra định dạng của email
CREATE OR REPLACE FUNCTION trg_users_validate_email()
RETURNS TRIGGER AS $$
BEGIN
    -- Kiểm tra email có null không
    IF NEW.email IS NULL OR NEW.email = '' THEN
        RAISE EXCEPTION 'Email không được để trống!';
    END IF;

    -- Kiểm tra định dạng email bằng regex
    IF NEW.email !~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
        RAISE EXCEPTION 'Email không hợp lệ: %', NEW.email;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

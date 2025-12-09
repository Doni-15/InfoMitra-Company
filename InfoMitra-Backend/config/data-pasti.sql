-- Active: 1762329389992@@127.0.0.1@5432@InfoMitra-Company

-- Admin User Seed Data
INSERT INTO Users (nama, email, password, role) 
VALUES
    ('Admin InfoMitra', 'admin@infomitra.com', 'admin123', 'admin')
;

SELECT * FROM Users;
UPDATE Users
SET role = 'admin'
WHERE id = 'a3867ae7-778c-4c03-b7a4-0181a43d6869';
-- VIP Data Seed
INSERT INTO harga_iklan (nama_paket, harga_dasar, badge_label, daftar_fitur, setting_diskon)
VALUES (
    'Paket VIP', 
    50000, 
    'POPULER', 
    ARRAY[
        'Iklan banner di homepage InfoMitra', 
        'Iklan banner di media sosial InfoMitra', 
        'Website lengkap + fitur tambahan',
        'Halaman promosi dengan desain fleksibel',
        'Update konten tanpa batas',
        'Prioritas layanan pelanggan'
    ],
    '[
        {"duration": 1, "percent": 0},
        {"duration": 6, "percent": 10},
        {"duration": 12, "percent": 20}
    ]'::jsonb
);

-- Biasa Data Seed
INSERT INTO harga_iklan (nama_paket, harga_dasar, badge_label, daftar_fitur, setting_diskon)
VALUES (
    'Paket Biasa', 
    30000, 
    '', 
    ARRAY[
        'Brosur digital standar', 
        'Halaman promosi dengan template', 
        'Update brosur 1x per bulan',
        'Statistik pengunjung dasar'
    ],
    '[
        {"duration": 1, "percent": 0},
        {"duration": 6, "percent": 0},
        {"duration": 12, "percent": 0}
    ]'::jsonb
);
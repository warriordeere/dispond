// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{
    fs::File,
    io::{Read, Write},
};

use serde::{Deserialize, Serialize};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![setup, read_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[derive(Debug, Deserialize, Serialize)]
struct SavegameInterface {
    created: u64,
    modified: u64,
    game: Game,
}

#[derive(Debug, Deserialize, Serialize)]
struct Game {
    name: String,
    spawn: LngLatLike,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(untagged)]
enum LngLatLike {
    ArrayVariant([f64; 2]),
    ObjectVariant { lng: f64, lat: f64 },
}

#[tauri::command]
fn setup(data: String) {
    if let Ok(_savegame) = serde_json::from_str::<SavegameInterface>(&data) {
        if let Some(document_dir) = dirs::document_dir() {
            let path = document_dir.join("Arcavigi Interactive/dispond/saves/saves.json");
            let mut file = File::create(path).unwrap();
            file.write_all(data.as_bytes()).unwrap();
        }
    } else {
        eprintln!("Failed to deserialize JSON data");
    }
}

#[derive(Debug, Deserialize)]
struct ReadFileData {
    base_dir: String,
    file_path: String
}

#[tauri::command]
fn read_file(data: ReadFileData) -> Result<String, String> {
    let dir = match data.base_dir.as_str() {
        "document_dir" => dirs::document_dir(),
        _ => return Err("Invalid base directory".into()),
    };

    if let Some(dir) = dir {
        let path = dir.join(data.file_path);
        let mut file = File::open(&path).map_err(|e| e.to_string())?;
        let mut contents = String::new();
        file.read_to_string(&mut contents)
            .map_err(|e| e.to_string())?;
        Ok(contents.into())
    } else {
        Err("Directory not found".into())
    }
}

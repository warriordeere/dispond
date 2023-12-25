// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![setup])
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
    println!("{data}");
    if let Ok(savegame) = serde_json::from_str::<SavegameInterface>(&data) {
        println!("{:?}", savegame);
    } else {
        eprintln!("Failed to deserialize JSON data");
    }
}

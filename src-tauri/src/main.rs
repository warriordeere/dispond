// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use discord_rpc_client::Client;
use serde::{Deserialize, Serialize};
use std::{
    env,
    fs::File,
    io::{Read, Write},
    thread,
    time::{self, SystemTime, UNIX_EPOCH},
};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![setup, read_file, presence])
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
    file_path: String,
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

#[derive(Debug, Deserialize)]
struct PresenceInterface {
    action: String,
    data: PresenceData,
}

#[derive(Debug, Deserialize)]
struct PresenceData {
    state: String,
    details: String,
    image_large: String,
    text_large: String,
    image_small: String,
    text_small: String,
}

#[tauri::command]
fn presence(window: tauri::Window, data: PresenceInterface) {
    println!("creating new thread for rpc...");
    thread::spawn(move || {
        println!("starting rpc...");
        let actd = data.data;

        let mut drpc = Client::new(1151927442596970517);

        let tn = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .expect("invalid time");

        drpc.on_ready(|_ctx| println!("rpc ready!"));
        drpc.on_error(|_ctx| eprintln!("rpc failed!"));

        drpc.start();

        if data.action == "EVENT_RPC_SET" {
            drpc.set_activity(|act| {
                act.state(actd.state)
                    .details(actd.details)
                    .assets(|at| {
                        at.large_image(actd.image_large)
                            .large_text(actd.text_large)
                            .small_image(actd.image_small)
                            .small_text(actd.text_small)
                    })
                    .timestamps(|t| t.start(tn.as_secs()))
            })
            .expect("setting activity failed!");
            println!("rpc activity set!");
        } else {
            eprintln!("set rpc activity failed!");
        }

        thread::sleep(time::Duration::from_secs(10));

        window
            .emit("EVENT_RPC_SET_SUCCESS", None::<()>)
            .expect("failed to omit rpc-success event!");
    });
}

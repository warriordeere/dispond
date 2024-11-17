// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use discord_presence::Client;
use serde::{Deserialize, Serialize};
use std::{
    env,
    fs::File,
    io::{Read, Write},
    sync::{Arc, Mutex},
    thread,
    time::{SystemTime, UNIX_EPOCH},
};

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
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
fn presence(data: PresenceInterface) {
    // adapted from https://github.com/jewlexx/discord-presence/blob/trunk/examples/discord_presence.rs
    // moving the rpc to an other thread; preventing an freezed app

    println!("Running rpc client with action: {}", data.action);

    let rpc = Arc::new(Mutex::new(Client::new(1151927442596970517)));
    let rpc_clone = rpc.clone();
    let data_arc = Arc::new(Mutex::new(data));

    thread::spawn(move || {
        let rpc_inner_clone = rpc_clone.clone();
        let data_clone = Arc::clone(&data_arc);

        rpc_clone
            .lock()
            .unwrap()
            .on_ready(move |_ctx| {
                println!("[DEBUG] [EVENT] rpc ready");
                set_activity(&rpc_inner_clone, &data_clone);
            })
            .persist();

        rpc_clone
            .lock()
            .unwrap()
            .on_error(|ctx| {
                eprintln!("[ERROR] [EVENT] {:?}", ctx.event);
            })
            .persist();

        rpc_clone.lock().unwrap().start();
    });
}

fn set_activity(rpc: &Arc<Mutex<Client>>, data: &Arc<Mutex<PresenceInterface>>) {
    let data = data.lock().unwrap();

    let state = data.data.state.clone();
    let details = data.data.details.clone();

    let image_small = data.data.image_small.clone();
    let text_small = data.data.text_small.clone();

    let image_large = data.data.image_large.clone();
    let text_large = data.data.text_large.clone();

    let time_now: SystemTime = SystemTime::now();
    let epoch_dur = time_now.duration_since(UNIX_EPOCH).expect("error at time");
    let start_time: u64 = epoch_dur.as_secs();

    if let Err(e) = rpc.lock().unwrap().set_activity(|act| {
        println!("[DEBUG] Setting presence");
        act.state(state)
            .details(details)
            .timestamps(|tsm| tsm.start(start_time))
            .assets(|ast| {
                ast.large_image(image_large)
                    .large_text(text_large)
                    .small_image(image_small)
                    .small_text(text_small)
            })
    }) {
        eprintln!("[ERROR] Setting presence failed: {}", e)
    }
}

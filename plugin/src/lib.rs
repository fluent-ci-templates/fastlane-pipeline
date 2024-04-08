use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn exec_lane(args: String) -> FnResult<String> {
    let stdout = dag()
        .devbox()?
        .with_exec(vec![
            "devbox",
            "global",
            "add",
            "jdk@17.0.7+7",
            "ruby@3.2.2",
        ])?
        .with_exec(vec![
            r#"
            eval "$(devbox global shellenv --recompute)"
            bundle install
        "#,
        ])?
        .with_exec(vec![
            r#"
            eval "$(devbox global shellenv --recompute)"
            bundle exec fastlane"#,
            &args,
        ])?
        .stdout()?;
    Ok(stdout)
}

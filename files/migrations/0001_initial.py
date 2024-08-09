# Generated by Django 4.2 on 2024-08-04 08:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Files',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('size', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('tags', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('upload_to', models.FileField(upload_to='uploads/')),
            ],
        ),
    ]

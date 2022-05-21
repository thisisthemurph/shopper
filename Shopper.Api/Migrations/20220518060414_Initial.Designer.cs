﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Shopper.Api.Contexts;

#nullable disable

namespace Shopper.Api.Migrations
{
    [DbContext(typeof(ShoppingListContext))]
    [Migration("20220518060414_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.5");

            modelBuilder.Entity("Shopper.Api.Models.ShoppingList", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTimeOffset>("CreatedAt")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasMaxLength(150)
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.Property<string>("Settings")
                        .HasColumnType("TEXT");

                    b.Property<DateTimeOffset>("UpdatedAt")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("ShoppingLists");
                });

            modelBuilder.Entity("Shopper.Api.Models.ShoppingListItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("CategoryId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.Property<int>("ShoppingListId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Status")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("ShoppingListId");

                    b.ToTable("ShoppingListItems");
                });

            modelBuilder.Entity("Shopper.Api.Models.ShoppingListItemCategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(25)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("ShoppingListItemCategories");
                });

            modelBuilder.Entity("Shopper.Api.Models.ShoppingListItem", b =>
                {
                    b.HasOne("Shopper.Api.Models.ShoppingListItemCategory", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId");

                    b.HasOne("Shopper.Api.Models.ShoppingList", "ShoppingList")
                        .WithMany("Items")
                        .HasForeignKey("ShoppingListId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("ShoppingList");
                });

            modelBuilder.Entity("Shopper.Api.Models.ShoppingList", b =>
                {
                    b.Navigation("Items");
                });
#pragma warning restore 612, 618
        }
    }
}